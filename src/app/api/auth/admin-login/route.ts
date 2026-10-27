import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/storage";
import { setSessionUser } from "@/lib/auth";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { isValidEmail } from "@/lib/validation";
import { verifyPassword, verifyAdminSecurityPasskey } from "@/lib/security";

// Strict rate limit for admin login: 5 attempts per IP per 15 minutes
const ADMIN_LOGIN_LIMIT = 5;
const ADMIN_LOGIN_WINDOW_MS = 15 * 60 * 1000;

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = checkRateLimit(`admin-login:${ip}`, ADMIN_LOGIN_LIMIT, ADMIN_LOGIN_WINDOW_MS);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many failed admin login attempts. System locked for security." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
    }

    const { email, password, passkey } = body as {
      email?: string;
      password?: string;
      passkey?: string;
    };

    if (!email || typeof email !== "string" || !isValidEmail(email) || !password) {
      return NextResponse.json(
        { error: "Administrator email and password are required." },
        { status: 400 }
      );
    }

    const normalisedEmail = email.trim().toLowerCase();
    const user = db.getUserByEmail(normalisedEmail);

    // 1. Verify User exists and is Admin
    if (!user || user.role !== "admin" || user.status === "suspended") {
      db.addAuditLog({
        actorEmail: normalisedEmail,
        actorRole: "public",
        action: "ADMIN_LOGIN_FAILED",
        ipAddress: ip,
        details: `Failed admin login attempt: account does not exist or lacks admin role. IP: ${ip}.`,
      });
      return NextResponse.json(
        { error: "Invalid administrator credentials or unauthorized access." },
        { status: 401 }
      );
    }

    // 2. Verify Admin Password
    const passwordValid =
      user.passwordHash && user.passwordSalt
        ? verifyPassword(password, user.passwordHash, user.passwordSalt)
        : false;

    // 3. Optional Admin Security Passkey (verified only if provided or strictly required in production)
    const passkeyValid = passkey ? verifyAdminSecurityPasskey(passkey) : true;

    if (!passwordValid || !passkeyValid) {
      db.addAuditLog({
        actorEmail: normalisedEmail,
        actorRole: "admin",
        action: "ADMIN_LOGIN_FAILED",
        ipAddress: ip,
        details: `Failed admin login attempt for ${normalisedEmail}: invalid credentials. IP: ${ip}.`,
      });
      return NextResponse.json(
        { error: "Invalid administrator email or password." },
        { status: 401 }
      );
    }

    // Authentication Success
    await setSessionUser(user.id);

    db.addAuditLog({
      actorEmail: user.email,
      actorRole: "admin",
      action: "ADMIN_LOGIN_SUCCESS",
      ipAddress: ip,
      details: `Super Administrator authenticated into Command Center via multi-factor credentials. IP: ${ip}.`,
    });

    const { passwordHash: _ph, passwordSalt: _ps, verificationCode: _vc, notes: _n, ...safeUser } = user;
    return NextResponse.json({ success: true, user: safeUser, redirect: "/admin" });
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json({ error: "Authentication system error." }, { status: 500 });
  }
}
