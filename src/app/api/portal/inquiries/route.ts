import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/storage";
import { InvestorInquiry } from "@/types";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const allInquiries = db.getInquiries();
  // Filter for this user (unless admin)
  const userInquiries =
    user.role === "admin"
      ? allInquiries
      : allInquiries.filter((inq) => inq.userId === user.id);

  return NextResponse.json({ inquiries: userInquiries });
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { subject, type, message, preferredDate } = await req.json();

    if (!subject || !message) {
      return NextResponse.json(
        { error: "Subject and message are required." },
        { status: 400 }
      );
    }

    const newInquiry: InvestorInquiry = {
      id: "inq-" + Date.now(),
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      subject,
      type: type || "General Question",
      message,
      preferredDate,
      status: "new",
      createdAt: new Date().toISOString(),
    };

    db.saveInquiry(newInquiry);

    db.addAuditLog({
      actorEmail: user.email,
      actorRole: user.role,
      action: "INQUIRY_SUBMITTED",
      details: `Investor submitted ${newInquiry.type}: "${subject}"`,
    });

    return NextResponse.json({ success: true, inquiry: newInquiry });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to record inquiry." }, { status: 500 });
  }
}
