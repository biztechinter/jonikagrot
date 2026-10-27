import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/storage";
import { setSessionUser } from "@/lib/auth";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { isValidEmail } from "@/lib/validation";
import { verifyPassword } from "@/lib/security";

// Allow 5 login attempts per IP per 15-minute window
const LOGIN_LIMIT = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

export async function POST(req: NextRequest) {
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

    const { email, password } = body as { email?: string; password?: string };

    if (!email || typeof email !== "string" || !isValidEmail(email)) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }

    if (!password || typeof password !== "string" || password.trim().length === 0) {
      return NextResponse.json({ error: "Password is required." }, { status: 400 });
    }

    const normalisedEmail = email.trim().toLowerCase();
    const user = db.getUserByEmail(normalisedEmail);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email address or password." },
        { status: 401 }
      );
    }

    if (user.status === "suspended") {
      return NextResponse.json(
        { error: "This account has been suspended by an administrator. Please contact the project team." },
        { status: 403 }
      );
    }

    // Protect Admin Account: Block admin credentials on the public investor login form
    if (user.role === "admin") {
      return NextResponse.json(
        {
          error: "Administrative accounts must sign in via the isolated Admin Command Center.",
          isAdmin: true,
          adminUrl: "/admin/login",
        },
        { status: 403 }
      );
    }

    // Verify Password
    const passwordValid =
      user.passwordHash && user.passwordSalt
        ? verifyPassword(password, user.passwordHash, user.passwordSalt)
        : false;

    if (!passwordValid) {
      return NextResponse.json(
        { error: "Invalid email address or password." },
        { status: 401 }
      );
    }

    // Set authenticated session cookie
    await setSessionUser(user.id);

    db.addAuditLog({
      actorEmail: user.email,
      actorRole: user.role,
      action: "USER_LOGIN",
      ipAddress: ip,
      details: `Investor signed in via credentials with role '${user.role}'. IP: ${ip}.`,
    });

    // Strip sensitive fields
    const { passwordHash: _ph, passwordSalt: _ps, verificationCode: _vc, notes: _n, ...safeUser } = user;

    return NextResponse.json({ success: true, user: safeUser });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Login failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
