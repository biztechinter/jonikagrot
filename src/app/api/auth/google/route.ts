import { NextRequest, NextResponse } from "next/server";
import { isGoogleAuthEnabled, getGoogleAuthorizationUrl } from "@/lib/googleAuth";
import { cookies } from "next/headers";
import crypto from "crypto";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const target = url.searchParams.get("target") === "admin" ? "admin" : "portal";

  if (!isGoogleAuthEnabled()) {
    // If Google credentials are not yet added to .env, redirect back with helpful instruction
    const redirectUrl = target === "admin" ? "/admin/login?error=google_not_configured" : "/login?error=google_not_configured";
    return NextResponse.redirect(new URL(redirectUrl, req.url));
  }

  const state = crypto.randomBytes(16).toString("hex");
  const cookieStore = cookies();
  cookieStore.set("oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10, // 10 minutes
  });

  cookieStore.set("oauth_target", target, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10, // 10 minutes
  });

  const authorizationUrl = getGoogleAuthorizationUrl(state);
  return NextResponse.redirect(authorizationUrl);
}
