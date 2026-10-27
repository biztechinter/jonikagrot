import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForTokens, getGoogleUserProfile } from "@/lib/googleAuth";
import { db } from "@/lib/storage";
import { setSessionUser } from "@/lib/auth";
import { cookies } from "next/headers";
import type { User, AccessRequest } from "@/types";
import { notifyAdminNewRegistration } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");

  const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000").replace(/\/$/, "");

  // Read and clear stored OAuth state and target
  const cookieStore = cookies();
  const storedState = cookieStore.get("oauth_state")?.value;
  const storedTarget = cookieStore.get("oauth_target")?.value || "portal";
  cookieStore.delete("oauth_state");
  cookieStore.delete("oauth_target");

  const fallbackLoginUrl = storedTarget === "admin" ? `${appUrl}/admin/login` : `${appUrl}/login`;

  if (error || !code) {
    return NextResponse.redirect(`${fallbackLoginUrl}?error=google_cancelled`);
  }

  // Validate state cookie to prevent CSRF
  if (!storedState || storedState !== state) {
    return NextResponse.redirect(`${fallbackLoginUrl}?error=invalid_oauth_state`);
  }

  try {
    const exchangeResult = await exchangeCodeForTokens(code);
    if (!exchangeResult.tokens || !exchangeResult.tokens.access_token) {
      const errCode =
        exchangeResult.error === "invalid_client"
          ? "invalid_client_secret"
          : "token_exchange_failed";
      return NextResponse.redirect(`${fallbackLoginUrl}?error=${errCode}`);
    }

    const tokens = exchangeResult.tokens;
    const profile = await getGoogleUserProfile(tokens.access_token);
    if (!profile || !profile.email) {
      return NextResponse.redirect(`${fallbackLoginUrl}?error=profile_fetch_failed`);
    }

    const normalisedEmail = profile.email.trim().toLowerCase();
    const isAdminAccount = db.isAuthorizedAdminEmail(normalisedEmail);

    // ── CASE 1: Admin sign-in request ───────────────────────────────
    if (storedTarget === "admin") {
      if (!isAdminAccount) {
        db.addAuditLog({
          actorEmail: normalisedEmail,
          actorRole: "public",
          action: "ADMIN_LOGIN_FAILED",
          details: `Unauthorized Google sign-in attempt into Admin Command Center from non-admin email ${normalisedEmail}.`,
        });
        return NextResponse.redirect(
          `${appUrl}/admin/login?error=unauthorized_admin&email=${encodeURIComponent(normalisedEmail)}`
        );
      }

      // Ensure user is provisioned as an active Admin
      const adminUser = db.ensureAdminUser(normalisedEmail, profile.name, "google");
      if (adminUser.status === "suspended") {
        return NextResponse.redirect(`${appUrl}/admin/login?error=suspended`);
      }

      await setSessionUser(adminUser.id);

      db.addAuditLog({
        actorEmail: adminUser.email,
        actorRole: "admin",
        action: "ADMIN_LOGIN_SUCCESS",
        details: `Administrator ${adminUser.name} (${adminUser.email}) authenticated into Command Center via Google OAuth 2.0.`,
      });

      return NextResponse.redirect(`${appUrl}/admin`);
    }

    // ── CASE 2: Investor Portal sign-in (or Admin logging in via /login) ──
    if (isAdminAccount) {
      const adminUser = db.ensureAdminUser(normalisedEmail, profile.name, "google");
      if (adminUser.status === "suspended") {
        return NextResponse.redirect(`${appUrl}/login?error=suspended`);
      }
      await setSessionUser(adminUser.id);
      db.addAuditLog({
        actorEmail: adminUser.email,
        actorRole: "admin",
        action: "USER_LOGIN",
        details: `Administrator ${adminUser.name} (${adminUser.email}) authenticated via Google OAuth 2.0.`,
      });
      return NextResponse.redirect(`${appUrl}/admin`);
    }

    let user = db.getUserByEmail(normalisedEmail);

    if (!user) {
      // Create new investor account verified through Google with onboarding gate pending
      const userId = "usr-g-" + Date.now();
      const newUser: User = {
        id: userId,
        email: normalisedEmail,
        name: profile.name || "Google Verified Investor",
        role: "registered",
        authProvider: "google",
        status: "active",
        emailVerified: true,
        profileCompleted: false,
        termsAccepted: false,
        category: "Private Investor",
        interest: "Equity",
        indicativeRange: "US$250,000 – US$500,000",
        createdAt: new Date().toISOString(),
        notes: "Registered via Google / Gmail OAuth 2.0. Onboarding profile completion pending.",
      };
      db.saveUser(newUser);
      user = newUser;

      // ── Create an AccessRequest so admin sees this investor in the queue ──────
      const newAccessRequest: AccessRequest = {
        id: "req-g-" + Date.now(),
        fullName: profile.name || "Google Verified Investor",
        businessEmail: normalisedEmail,
        organization: "—",
        country: "—",
        category: "Private Investor",
        interest: "Equity",
        indicativeRange: "US$250,000 – US$500,000",
        message: "Registered via Google OAuth 2.0. Onboarding profile completion pending.",
        privacyAccepted: false,
        emailVerified: true,
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      db.saveAccessRequest(newAccessRequest);

      db.addAuditLog({
        actorEmail: normalisedEmail,
        actorRole: "registered",
        action: "USER_REGISTERED",
        details: `New investor account registered via Google OAuth 2.0 for ${profile.name} (${normalisedEmail}).`,
      });

      // ── Notify admins (fire-and-forget) ────────────────────────────────────
      notifyAdminNewRegistration({
        name: profile.name || "Google Verified Investor",
        email: normalisedEmail,
        category: "Private Investor",
        interest: "Equity",
        indicativeRange: "US$250,000 – US$500,000",
      }).catch((err) => console.error("[Email] Google OAuth registration notification failed:", err));

    } else {
      // Ensure email verified flag is updated
      if (!user.emailVerified) {
        user.emailVerified = true;
        user.authProvider = "google";
        db.saveUser(user);
      }
    }

    if (user.status === "suspended") {
      return NextResponse.redirect(`${appUrl}/login?error=suspended`);
    }

    // Set authenticated session cookie
    await setSessionUser(user.id);

    db.addAuditLog({
      actorEmail: user.email,
      actorRole: user.role,
      action: "USER_LOGIN",
      details: `User signed in via Google OAuth with role '${user.role}'.`,
    });

    if (user.role === "admin") {
      return NextResponse.redirect(`${appUrl}/admin`);
    } else {
      return NextResponse.redirect(`${appUrl}/portal`);
    }
  } catch (err) {
    console.error("Google OAuth callback exception:", err);
    return NextResponse.redirect(`${fallbackLoginUrl}?error=google_internal_error`);
  }
}
