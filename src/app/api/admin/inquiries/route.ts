import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/storage";

// Admin-only: update inquiry status (read | replied)
export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Access denied." }, { status: 403 });
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const { id, status } = body as { id?: string; status?: string };

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Inquiry ID is required." }, { status: 400 });
    }

    const ALLOWED_STATUSES = ["read", "replied"] as const;
    if (!status || !ALLOWED_STATUSES.includes(status as (typeof ALLOWED_STATUSES)[number])) {
      return NextResponse.json({ error: "Invalid status. Must be 'read' or 'replied'." }, { status: 400 });
    }

    const updated = db.updateInquiryStatus(id, status as "read" | "replied");
    if (!updated) {
      return NextResponse.json({ error: "Inquiry not found." }, { status: 404 });
    }

    db.addAuditLog({
      actorEmail: user.email,
      actorRole: "admin",
      action: "INQUIRY_STATUS_UPDATED",
      targetResource: id,
      details: `Administrator marked inquiry ${id} as '${status}'.`,
    });

    return NextResponse.json({ success: true, inquiry: updated });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Operation failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
