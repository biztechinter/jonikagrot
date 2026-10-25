import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getCurrentUser, canAccessDocument } from "@/lib/auth";
import { db } from "@/lib/storage";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

interface Params {
  params: {
    id: string;
  };
}

const MIME_TYPES: Record<string, string> = {
  ".pdf": "application/pdf",
  ".docx":
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".xlsx":
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".pptx":
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".txt": "text/plain; charset=utf-8",
};

// Max 30 document downloads per authenticated user per 10-minute window.
const DOWNLOAD_LIMIT = 30;
const DOWNLOAD_WINDOW_MS = 10 * 60 * 1000;

export async function GET(req: NextRequest, { params }: Params) {
  // ── Authentication ────────────────────────────────────────────────
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json(
      { error: "Authentication required. Please log in to access the document library." },
      { status: 401 }
    );
  }

  // ── Rate limiting (per authenticated user) ───────────────────────
  const ip = getClientIp(req);
  const rl = checkRateLimit(`download:${user.id}`, DOWNLOAD_LIMIT, DOWNLOAD_WINDOW_MS);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Download rate limit reached. Please wait before downloading more documents." },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil(rl.retryAfterMs / 1000)) },
      }
    );
  }

  // ── Document ID validation ────────────────────────────────────────
  const docId = params.id;
  if (!docId || !/^[\w-]{1,64}$/.test(docId)) {
    return NextResponse.json({ error: "Invalid document identifier." }, { status: 400 });
  }

  try {
    const doc = db.getDocumentById(docId);
    if (!doc) {
      return NextResponse.json(
        { error: "Document not found in the registry." },
        { status: 404 }
      );
    }

    // ── Role-based authorisation ─────────────────────────────────────
    const isAllowed = canAccessDocument(user.role, doc.requiredRole);
    if (!isAllowed) {
      db.addAuditLog({
        actorEmail: user.email,
        actorRole: user.role,
        action: "DOCUMENT_VIEWED",
        targetResource: doc.filename,
        ipAddress: ip,
        details: `UNAUTHORISED download attempt: role '${user.role}' tried to access '${doc.title}' (${doc.confidentiality}). Blocked. IP: ${ip}.`,
      });

      return NextResponse.json(
        {
          error: `Access denied. This document requires ${doc.confidentiality} clearance. Contact the project team to request a tier upgrade.`,
        },
        { status: 403 }
      );
    }

    // ── Path traversal prevention ─────────────────────────────────────
    const storageDir = path.resolve(process.cwd(), "server-storage", "documents");
    // Sanitise: remove any directory traversal sequences from the filename stored in the DB.
    const safeFilename = path.basename(doc.filename);
    const filePath = path.resolve(storageDir, safeFilename);

    if (!filePath.startsWith(storageDir + path.sep) && filePath !== storageDir) {
      return NextResponse.json(
        { error: "Access denied: invalid file path." },
        { status: 400 }
      );
    }

    // ── Allowed extension whitelist ───────────────────────────────────
    const ext = path.extname(safeFilename).toLowerCase();
    const contentType = MIME_TYPES[ext];
    if (!contentType) {
      return NextResponse.json(
        { error: "This file type is not available for download." },
        { status: 415 }
      );
    }

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: "The file is currently being processed. Please try again shortly." },
        { status: 404 }
      );
    }

    const fileBuffer = fs.readFileSync(filePath);

    // ── Audit and metrics ─────────────────────────────────────────────
    db.incrementDocumentDownload(doc.id);
    db.addAuditLog({
      actorEmail: user.email,
      actorRole: user.role,
      action: "DOCUMENT_DOWNLOADED",
      targetResource: doc.filename,
      ipAddress: ip,
      details: `Downloaded '${doc.title}' (${doc.confidentiality}, Version ${doc.version}). IP: ${ip}.`,
    });

    const response = new NextResponse(fileBuffer);
    response.headers.set("Content-Type", contentType);
    response.headers.set(
      "Content-Disposition",
      `attachment; filename="${encodeURIComponent(safeFilename)}"`
    );
    response.headers.set("Content-Length", fileBuffer.length.toString());
    // Prevent document caching in browsers and intermediary proxies.
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, private, max-age=0"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("X-Content-Type-Options", "nosniff");

    return response;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to download document.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
