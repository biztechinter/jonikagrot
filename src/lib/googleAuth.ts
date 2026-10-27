import crypto from "crypto";

export interface GoogleUserInfo {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
}

export function isGoogleAuthEnabled(): boolean {
  return Boolean(
    process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.GOOGLE_CLIENT_ID.trim().length > 0
  );
}

export function getGoogleOAuthRedirectUrl(): string {
  const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000").replace(/\/$/, "");
  return `${appUrl}/api/auth/google/callback`;
}

/**
 * Build the Google OAuth 2.0 authorization URL
 */
export function getGoogleAuthorizationUrl(state: string): string {
  const clientId = process.env.GOOGLE_CLIENT_ID || "";
  const redirectUri = getGoogleOAuthRedirectUrl();
  const scope = encodeURIComponent("openid email profile");

  return (
    `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${encodeURIComponent(clientId)}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `response_type=code&` +
    `scope=${scope}&` +
    `state=${encodeURIComponent(state)}&` +
    `access_type=offline&` +
    `prompt=select_account`
  );
}

export function getGoogleClientId(): string {
  return (process.env.GOOGLE_CLIENT_ID || "").trim().replace(/\r/g, "");
}

export function getGoogleClientSecret(): string {
  return (process.env.GOOGLE_CLIENT_SECRET || "").trim().replace(/\r/g, "");
}

/**
 * Exchange the authorization code for access tokens with Google OAuth 2.0
 */
export async function exchangeCodeForTokens(
  code: string
): Promise<{ tokens?: { access_token: string; id_token?: string }; error?: string }> {
  const clientId = getGoogleClientId();
  const clientSecret = getGoogleClientSecret();
  const redirectUri = getGoogleOAuthRedirectUrl().trim();

  const params = new URLSearchParams({
    code: code.trim(),
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  });

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Google token exchange error:", response.status, errorBody);
    try {
      const parsed = JSON.parse(errorBody);
      return { error: parsed.error || "token_exchange_failed" };
    } catch {
      return { error: "token_exchange_failed" };
    }
  }

  const tokens = await response.json();
  return { tokens };
}

/**
 * Fetch the authenticated user's profile from Google's UserInfo API
 */
export async function getGoogleUserProfile(accessToken: string): Promise<GoogleUserInfo | null> {
  const response = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    console.error("Google userinfo fetch failed:", response.status);
    return null;
  }

  return response.json();
}
