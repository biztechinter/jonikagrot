import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/storage";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message, honeyPot } = await req.json();

    if (honeyPot) {
      return NextResponse.json({ success: true }); // Silent spam drop
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    db.addAuditLog({
      actorEmail: email,
      actorRole: "public",
      action: "INQUIRY_SUBMITTED",
      details: `Direct website inquiry received from ${name}: "${subject}"`,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to submit message." }, { status: 500 });
  }
}
