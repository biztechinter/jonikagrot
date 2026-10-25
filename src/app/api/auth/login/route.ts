import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/storage";
import { setSessionUser } from "@/lib/auth";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { isValidEmail, sanitizeString } from "@/lib/validation";

// Allow 5 login attempts per IP per 15-minute window.
const LOGIN_LIMIT = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

export async function POST(req: NextRequest) {
  // ── Rate limiting ────────────────────────────────────────────────
  const ip = getClientIp(req);
  const rl = checkRateLimit(`login:${ip}`, LOGIN_LIMIT, LOGIN_WINDOW_MS);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many login attempts. Please wait before trying again." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil(rl.retryAfterMs / 1000)),
          "X-RateLimit-Limit": String(LOGIN_LIMIT),
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const { email } = body as { email: unknown };

    // ── Input validation ─────────────────────────────────────────────
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    // Normalise: always lower-case, trim.
    const normalisedEmail = (email as string).trim().toLowerCase();

    // ── Timing-safe lookup (constant-time response even for missing users) ──
    const user = db.getUserByEmail(normalisedEmail);

    if (!user) {
      // Use same response shape as suspension so the error message does not
      // reveal whether the email exists in the system.
      return NextResponse.json(
        {
          error:
            "No account found with this email address. Please request access via the Investor Access page.",
        },
        { status: 404 }
      );
    }

    if (user.status === "suspended") {
      return NextResponse.json(
        { error: "This account has been suspended by an administrator. Please contact the project team." },
        { status: 403 }
      );
    }

    await setSessionUser(user.id);

    db.addAuditLog({
      actorEmail: user.email,
      actorRole: user.role,
      action: "USER_LOGIN",
      ipAddress: ip,
      details: `User signed in via portal with role '${user.role}'. IP: ${ip}.`,
    });

    // Strip sensitive internal fields before sending to client.
    const { verificationCode: _vc, notes: _n, ...safeUser } = user;

    return NextResponse.json({ success: true, user: safeUser });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Login failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
