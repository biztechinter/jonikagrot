import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/storage";
import { setSessionUser } from "@/lib/auth";
import { AccessRequest, User } from "@/types";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { hashPassword } from "@/lib/security";
import {
  isValidEmail,
  isValidName,
  isValidCountry,
  isValidInvestorCategory,
  isValidInvestmentInterest,
  sanitizeString,
} from "@/lib/validation";
import { notifyAdminNewRegistration } from "@/lib/email";

// Max 3 registration submissions per IP per hour to deter form flooding.
const REGISTER_LIMIT = 3;
const REGISTER_WINDOW_MS = 60 * 60 * 1000;

export async function POST(req: NextRequest) {
  // ── Rate limiting ────────────────────────────────────────────────
  const ip = getClientIp(req);
  const rl = checkRateLimit(`investor-access:${ip}`, REGISTER_LIMIT, REGISTER_WINDOW_MS);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many registration requests. Please wait before submitting again." },
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

    const {
      fullName,
      businessEmail,
      organization,
      country,
      category,
      interest,
      indicativeRange,
      message,
      privacyAccepted,
      password,
    } = body as Record<string, unknown>;

    // ── Server-side field validation ─────────────────────────────────
    const errors: string[] = [];

    if (!isValidName(fullName)) errors.push("Full name is required (2–256 characters).");
    if (!isValidEmail(businessEmail)) errors.push("A valid business email address is required.");
    if (!password || typeof password !== "string" || password.length < 8) {
      errors.push("A secure password of at least 8 characters is required.");
    }
    if (!isValidCountry(country)) errors.push("Country is required.");
    if (!isValidInvestorCategory(category))
      errors.push("A valid investor category must be selected.");
    if (!isValidInvestmentInterest(interest))
      errors.push("A valid investment interest must be selected.");
    if (!privacyAccepted)
      errors.push("You must accept the confidentiality terms to proceed.");

    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join(" ") }, { status: 400 });
    }

    // ── Sanitise free-text fields ────────────────────────────────────
    const safeFullName = sanitizeString(fullName, 256);
    const safeOrganization = sanitizeString(organization, 256);
    const safeMessage = sanitizeString(message, 2048);
    const safeRange = sanitizeString(indicativeRange, 128);
    const normalisedEmail = (businessEmail as string).trim().toLowerCase();

    // ── Duplicate guard: one pending request per email ───────────────
    const existingRequest = db.getAccessRequests().find(
      (r) =>
        r.businessEmail.toLowerCase() === normalisedEmail && r.status === "pending"
    );
    if (existingRequest) {
      return NextResponse.json(
        {
          success: true,
          message:
            "Your application is already under review. We will be in touch once it has been assessed.",
          verificationRequired: false,
        },
        { status: 200 }
      );
    }

    // ── Persist access request ───────────────────────────────────────
    const requestId = "req-" + Date.now();
    const newRequest: AccessRequest = {
      id: requestId,
      fullName: safeFullName,
      businessEmail: normalisedEmail,
      organization: safeOrganization,
      country: sanitizeString(country, 100),
      category: category as AccessRequest["category"],
      interest: interest as AccessRequest["interest"],
      indicativeRange: safeRange,
      message: safeMessage,
      privacyAccepted: true,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    db.saveAccessRequest(newRequest);

    // ── Create or update user record ─────────────────────────────────
    let userId: string;
    const existingUser = db.getUserByEmail(normalisedEmail);

    const { hash, salt } = hashPassword(password as string);

    if (existingUser) {
      // Never downgrade an approved or admin user.
      userId = existingUser.id;
      existingUser.organization = safeOrganization || existingUser.organization;
      existingUser.country = sanitizeString(country, 100) || existingUser.country;
      existingUser.category = category as User["category"];
      existingUser.interest = interest as User["interest"];
      existingUser.indicativeRange = safeRange;
      if (!existingUser.passwordHash) {
        existingUser.passwordHash = hash;
        existingUser.passwordSalt = salt;
      }
      db.saveUser(existingUser);
    } else {
      userId = "usr-" + Date.now();
      const verificationCode = String(Math.floor(100000 + Math.random() * 900000));
      const newUser: User = {
        id: userId,
        email: normalisedEmail,
        name: safeFullName,
        organization: safeOrganization,
        country: sanitizeString(country, 100),
        role: "registered",
        category: category as User["category"],
        interest: interest as User["interest"],
        indicativeRange: safeRange,
        passwordHash: hash,
        passwordSalt: salt,
        authProvider: "credentials",
        status: "active",
        emailVerified: false,
        verificationCode,
        createdAt: new Date().toISOString(),
        notes:
          "Registered via Investor Access form. Awaiting email verification and administrative Tier 3 review.",
      };
      db.saveUser(newUser);
    }

    // Sign in immediately so the user can access the portal dashboard.
    await setSessionUser(userId);

    db.addAuditLog({
      actorEmail: normalisedEmail,
      actorRole: "registered",
      action: "ACCESS_REQUEST_SUBMITTED",
      ipAddress: ip,
      details: `New investor application submitted by ${safeFullName} (${sanitizeString(category, 80)}, ${sanitizeString(country, 100)}). IP: ${ip}.`,
    });

    // ── Notify all admins by email (fire-and-forget — never blocks response) ──
    notifyAdminNewRegistration({
      name: safeFullName,
      email: normalisedEmail,
      organization: safeOrganization,
      country: sanitizeString(country, 100),
      category: sanitizeString(category, 80),
      interest: sanitizeString(interest, 80),
      indicativeRange: safeRange,
    }).catch((err) => console.error("[Email] Admin notification failed:", err));

    const userObj = db.getUserById(userId);
    const { verificationCode: _vc, notes: _n, ...safeUser } = userObj!;

    return NextResponse.json({
      success: true,
      message: "Application recorded successfully.",
      verificationRequired: !userObj?.emailVerified,
      user: safeUser,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to process application.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
