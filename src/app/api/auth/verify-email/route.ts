import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/storage";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { isValidEmail, isValidVerificationCode } from "@/lib/validation";

// 10 attempts per IP per 30-minute window.
const VERIFY_LIMIT = 10;
const VERIFY_WINDOW_MS = 30 * 60 * 1000;

export async function POST(req: NextRequest) {
  // ── Rate limiting ────────────────────────────────────────────────
  const ip = getClientIp(req);
  const rl = checkRateLimit(`verify:${ip}`, VERIFY_LIMIT, VERIFY_WINDOW_MS);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many verification attempts. Please wait before trying again." },
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

    const { email, code } = body as { email: unknown; code: unknown };

    // ── Input validation ─────────────────────────────────────────────
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }

    // Code may be omitted if the user is using the demo bypass.
    // If provided, it must be exactly 6 digits.
    if (code !== undefined && !isValidVerificationCode(code)) {
      return NextResponse.json(
        { error: "Invalid verification code format. Expected a 6-digit code." },
        { status: 400 }
      );
    }

    const normalisedEmail = (email as string).trim().toLowerCase();
    const user = db.getUserByEmail(normalisedEmail);
    if (!user) {
      // Deliberately vague — do not confirm whether the email exists.
      return NextResponse.json({ error: "Account not found." }, { status: 404 });
    }

    const providedCode = typeof code === "string" ? code.trim() : null;
    const expectedCode = user.verificationCode || "123456";

    if (providedCode && providedCode !== expectedCode && providedCode !== "123456") {
      return NextResponse.json(
        { error: "Invalid verification code. Please check your email or use the demo code 123456." },
        { status: 400 }
      );
    }

    user.emailVerified = true;
    // Clear the stored code once verified so it cannot be replayed.
    delete user.verificationCode;
    db.saveUser(user);

    // Also mark any matching access request as verified.
    const allReqs = db.getAccessRequests();
    const matchReq = allReqs.find(
      (r) => r.businessEmail.toLowerCase() === normalisedEmail
    );
    if (matchReq) {
      matchReq.emailVerified = true;
      db.saveAccessRequest(matchReq);
    }

    db.addAuditLog({
      actorEmail: user.email,
      actorRole: user.role,
      action: "EMAIL_VERIFIED",
      ipAddress: ip,
      details: `Investor email verified successfully. IP: ${ip}.`,
    });

    const { verificationCode: _vc, notes: _n, ...safeUser } = user;

    return NextResponse.json({
      success: true,
      message: "Email address verified successfully. Tier 2 portal access is now active.",
      user: safeUser,
    });
  } catch (err: unknown) {
    return NextResponse.json({ error: "Verification failed." }, { status: 500 });
  }
}
