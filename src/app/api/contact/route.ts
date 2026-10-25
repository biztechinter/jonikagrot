import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/storage";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { isValidEmail, isValidName, sanitizeString } from "@/lib/validation";

// 5 contact submissions per IP per hour.
const CONTACT_LIMIT = 5;
const CONTACT_WINDOW_MS = 60 * 60 * 1000;

export async function POST(req: NextRequest) {
  // ── Rate limiting ────────────────────────────────────────────────
  const ip = getClientIp(req);
  const rl = checkRateLimit(`contact:${ip}`, CONTACT_LIMIT, CONTACT_WINDOW_MS);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many messages sent. Please wait before submitting again." },
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

    const { name, email, subject, message, honeyPot } = body as Record<string, unknown>;

    // ── Honeypot bot detection (silent drop) ─────────────────────────
    if (honeyPot) {
      return NextResponse.json({ success: true });
    }

    // ── Server-side validation ────────────────────────────────────────
    if (!isValidName(name)) {
      return NextResponse.json({ error: "Name is required (2–256 characters)." }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }
    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters long." },
        { status: 400 }
      );
    }

    const safeName = sanitizeString(name, 256);
    const safeSubject = sanitizeString(subject, 512);
    const safeMessage = sanitizeString(message, 4000);
    const normalisedEmail = (email as string).trim().toLowerCase();

    db.addAuditLog({
      actorEmail: normalisedEmail,
      actorRole: "public",
      action: "INQUIRY_SUBMITTED",
      ipAddress: ip,
      details: `Website contact inquiry received from ${safeName} (${normalisedEmail}): "${safeSubject}". IP: ${ip}.`,
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    return NextResponse.json({ error: "Failed to submit message." }, { status: 500 });
  }
}
