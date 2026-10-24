import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getCurrentUser, canAccessDocument } from "@/lib/auth";
import { db } from "@/lib/storage";

interface Params {
  params: {
    id: string;
  };
}

const MIME_TYPES: Record<string, string> = {
  ".pdf": "application/pdf",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".txt": "text/plain",
  ".png": "image/png",
  ".jpg": "image/jpeg",
};

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Authentication required. Please log in to download diligence documents." },
        { status: 401 }
      );
    }

    const doc = db.getDocumentById(params.id);
    if (!doc) {
      return NextResponse.json({ error: "Document not found in registry." }, { status: 404 });
    }

    // Role-based authorization enforcement
    const isAllowed = canAccessDocument(user.role, doc.requiredRole);
    if (!isAllowed) {
      db.addAuditLog({
        actorEmail: user.email,
        actorRole: user.role,
        action: "DOCUMENT_VIEWED",
        targetResource: doc.filename,
        details: `UNAUTHORIZED download attempt: User with role '${user.role}' attempted to access restricted file '${doc.title}' (${doc.confidentiality}). Access blocked.`,
      });

      return NextResponse.json(
        {
          error: `Access Denied: This document is classified as ${doc.confidentiality}. Your current tier is '${user.role}'. Please request a tier upgrade from the project administrator.`,
        },
        { status: 403 }
      );
    }

    const storageDir = path.resolve(process.cwd(), "server-storage", "documents");
    const filePath = path.resolve(storageDir, doc.filename);

    // Prevent directory traversal attacks
    if (!filePath.startsWith(storageDir)) {
      return NextResponse.json({ error: "Access Denied: Path traversal detected." }, { status: 400 });
    }

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: `File '${doc.filename}' is currently being archived on storage servers.` },
        { status: 404 }
      );
    }

    const fileBuffer = fs.readFileSync(filePath);
    const ext = path.extname(doc.filename).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    // Update download counter & record audit log
    db.incrementDocumentDownload(doc.id);
    db.addAuditLog({
      actorEmail: user.email,
      actorRole: user.role,
      action: "DOCUMENT_DOWNLOADED",
      targetResource: doc.filename,
      details: `User downloaded confidential document '${doc.title}' (Version ${doc.version}).`,
    });

    const response = new NextResponse(fileBuffer);
    response.headers.set("Content-Type", contentType);
    response.headers.set(
      "Content-Disposition",
      `attachment; filename="${encodeURIComponent(doc.filename)}"`
    );
    response.headers.set("Content-Length", fileBuffer.length.toString());
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, private");

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to download document." },
      { status: 500 }
    );
  }
}
