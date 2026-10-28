import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/storage";
import { sanitizeString } from "@/lib/validation";
import type {
  DiligenceDocument,
  DocumentCategory,
  ConfidentialityLevel,
  UserRole,
} from "@/types";

export const dynamic = "force-dynamic";

const VALID_CATEGORIES: DocumentCategory[] = [
  "Investment Overview",
  "Site and Development",
  "Financial Information",
  "Due Diligence",
  "Transaction and Investment Process",
];

const VALID_CONFIDENTIALITY: ConfidentialityLevel[] = [
  "Public",
  "Tier 2 Registered",
  "Tier 3 Approved",
];

const VALID_ROLES: UserRole[] = ["public", "registered", "approved"];

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json(
      { error: "Access denied. Administrator privileges required." },
      { status: 403 }
    );
  }

  return NextResponse.json({
    documents: db.getDocuments(),
  });
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Access denied." }, { status: 403 });
    }

    const contentType = req.headers.get("content-type") || "";
    let id: string | null = null;
    let title = "";
    let description = "";
    let category: DocumentCategory = "Investment Overview";
    let confidentiality: ConfidentialityLevel = "Tier 2 Registered";
    let requiredRole: UserRole = "registered";
    let version = "V1.0";
    let date = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });
    let executiveHighlights: string[] = [];
    let uploadedFile: File | null = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      id = (formData.get("id") as string) || null;
      title = (formData.get("title") as string) || "";
      description = (formData.get("description") as string) || "";
      category = (formData.get("category") as DocumentCategory) || category;
      confidentiality = (formData.get("confidentiality") as ConfidentialityLevel) || confidentiality;
      requiredRole = (formData.get("requiredRole") as UserRole) || requiredRole;
      version = (formData.get("version") as string) || version;
      date = (formData.get("date") as string) || date;
      const rawHighlights = formData.get("executiveHighlights") as string;
      if (rawHighlights) {
        try {
          executiveHighlights = JSON.parse(rawHighlights);
        } catch {
          executiveHighlights = rawHighlights
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean);
        }
      }
      uploadedFile = formData.get("file") as File | null;
    } else {
      const body = await req.json().catch(() => null);
      if (!body) {
        return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
      }
      id = body.id || null;
      title = body.title || "";
      description = body.description || "";
      category = body.category || category;
      confidentiality = body.confidentiality || confidentiality;
      requiredRole = body.requiredRole || requiredRole;
      version = body.version || version;
      date = body.date || date;
      executiveHighlights = Array.isArray(body.executiveHighlights)
        ? body.executiveHighlights
        : [];
    }

    if (!title.trim()) {
      return NextResponse.json({ error: "Document title is required." }, { status: 400 });
    }

    if (!VALID_CATEGORIES.includes(category)) {
      category = "Investment Overview";
    }

    if (!VALID_CONFIDENTIALITY.includes(confidentiality)) {
      confidentiality = "Tier 2 Registered";
    }

    if (!VALID_ROLES.includes(requiredRole)) {
      requiredRole = "registered";
    }

    const storageDir = path.resolve(process.cwd(), "server-storage", "documents");
    fs.mkdirSync(storageDir, { recursive: true });

    let existingDoc: DiligenceDocument | undefined;
    if (id) {
      existingDoc = db.getDocumentById(id);
    }

    let filename = existingDoc?.filename || "";
    let filesize = existingDoc?.filesize || "—";
    let filetype: DiligenceDocument["filetype"] = existingDoc?.filetype || "PDF";

    if (uploadedFile && uploadedFile.size > 0) {
      const originalName = uploadedFile.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      filename = originalName;

      const ext = path.extname(originalName).toLowerCase();
      if (ext === ".pdf") filetype = "PDF";
      else if (ext === ".docx" || ext === ".doc") filetype = "DOCX";
      else if (ext === ".xlsx" || ext === ".xls" || ext === ".csv") filetype = "XLSX";
      else if (ext === ".pptx" || ext === ".ppt") filetype = "PPTX";
      else filetype = "TXT";

      const bytes = await uploadedFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filePath = path.join(storageDir, filename);
      fs.writeFileSync(filePath, buffer);

      const kb = buffer.length / 1024;
      if (kb > 1024) {
        filesize = (kb / 1024).toFixed(1) + " MB";
      } else {
        filesize = kb.toFixed(1) + " KB";
      }
    } else if (!existingDoc) {
      return NextResponse.json(
        { error: "A file upload is required when creating a new document." },
        { status: 400 }
      );
    }

    const docId = id || `doc-${Date.now()}`;
    const docToSave: DiligenceDocument = {
      id: docId,
      title: sanitizeString(title, 256),
      description: sanitizeString(description, 1024),
      category,
      filename,
      filesize,
      filetype,
      version: sanitizeString(version, 32),
      date: sanitizeString(date, 64),
      confidentiality,
      requiredRole,
      downloadsCount: existingDoc?.downloadsCount || 0,
      executiveHighlights: executiveHighlights.map((h) => sanitizeString(h, 256)),
    };

    db.saveDocument(docToSave);

    db.addAuditLog({
      actorEmail: user.email,
      actorRole: "admin",
      action: existingDoc ? "DOCUMENT_UPDATED" : "DOCUMENT_UPLOADED",
      targetResource: filename,
      details: `Administrator ${existingDoc ? "updated" : "uploaded"} document '${docToSave.title}' (${docToSave.confidentiality}, Role: ${docToSave.requiredRole}).`,
    });

    return NextResponse.json({
      success: true,
      document: docToSave,
      message: existingDoc
        ? `Document '${docToSave.title}' updated successfully.`
        : `New document '${docToSave.title}' added to registry.`,
    });
  } catch (err: any) {
    console.error("[Documents API Error]:", err);
    return NextResponse.json(
      { error: err.message || "Failed to save document." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Access denied." }, { status: 403 });
    }

    const body = await req.json().catch(() => null);
    if (!body || !body.id) {
      return NextResponse.json({ error: "Document ID is required." }, { status: 400 });
    }

    const doc = db.getDocumentById(body.id);
    if (!doc) {
      return NextResponse.json({ error: "Document not found." }, { status: 404 });
    }

    const deleted = db.deleteDocument(body.id);
    if (!deleted) {
      return NextResponse.json({ error: "Failed to delete document from database." }, { status: 500 });
    }

    // Try removing physical file if not used by another document
    try {
      const storageDir = path.resolve(process.cwd(), "server-storage", "documents");
      const filePath = path.join(storageDir, path.basename(doc.filename));
      const otherDocsUsingFile = db.getDocuments().some((d) => d.filename === doc.filename);
      if (!otherDocsUsingFile && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (fsErr) {
      console.warn("Could not remove file from disk:", fsErr);
    }

    db.addAuditLog({
      actorEmail: user.email,
      actorRole: "admin",
      action: "DOCUMENT_DELETED",
      targetResource: doc.filename,
      details: `Administrator ${user.email} deleted document '${doc.title}' (${doc.filename}) from data room.`,
    });

    return NextResponse.json({
      success: true,
      message: `Document '${doc.title}' has been removed from the registry.`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to delete document." },
      { status: 500 }
    );
  }
}
