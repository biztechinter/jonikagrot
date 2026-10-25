import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/storage";
import { InvestorInquiry } from "@/types";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { sanitizeString } from "@/lib/validation";

const ALLOWED_INQUIRY_TYPES = new Set([
  "General Question",
  "Meeting Request",
  "Due Diligence Request",
  "Term Sheet Discussion",
]);

// 10 inquiry submissions per authenticated user per hour.
const INQUIRY_LIMIT = 10;
const INQUIRY_WINDOW_MS = 60 * 60 * 1000;

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const allInquiries = db.getInquiries();
  // Admins see all; investors only see their own — strict user isolation.
  const userInquiries =
    user.role === "admin"
      ? allInquiries
      : allInquiries.filter((inq) => inq.userId === user.id);

  return NextResponse.json({ inquiries: userInquiries });
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  // Rate-limit per authenticated user.
  const ip = getClientIp(req);
  const rl = checkRateLimit(`inquiry:${user.id}`, INQUIRY_LIMIT, INQUIRY_WINDOW_MS);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many inquiries submitted. Please wait before submitting another." },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil(rl.retryAfterMs / 1000)) },
      }
    );
  }

  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const { subject, type, message, preferredDate } = body as Record<string, unknown>;

    if (!subject || typeof subject !== "string" || subject.trim().length < 4) {
      return NextResponse.json(
        { error: "Subject is required (at least 4 characters)." },
        { status: 400 }
      );
    }
    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { error: "Message is required (at least 10 characters)." },
        { status: 400 }
      );
    }

    // Validate type against whitelist.
    const safeType: InvestorInquiry["type"] = ALLOWED_INQUIRY_TYPES.has(type as string)
      ? (type as InvestorInquiry["type"])
      : "General Question";

    const newInquiry: InvestorInquiry = {
      id: "inq-" + Date.now(),
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      subject: sanitizeString(subject, 512),
      type: safeType,
      message: sanitizeString(message, 4000),
      preferredDate:
        preferredDate && typeof preferredDate === "string"
          ? sanitizeString(preferredDate, 64)
          : undefined,
      status: "new",
      createdAt: new Date().toISOString(),
    };

    db.saveInquiry(newInquiry);

    db.addAuditLog({
      actorEmail: user.email,
      actorRole: user.role,
      action: "INQUIRY_SUBMITTED",
      ipAddress: ip,
      details: `Investor submitted ${newInquiry.type}: "${newInquiry.subject}". IP: ${ip}.`,
    });

    return NextResponse.json({ success: true, inquiry: newInquiry });
  } catch (err: unknown) {
    return NextResponse.json({ error: "Failed to record inquiry." }, { status: 500 });
  }
}
