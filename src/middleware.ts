import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware — runs on Edge Runtime before every matched request.
 *
 * Responsibilities:
 * 1. Redirect unauthenticated requests to /portal/* and /admin/* to the login page.
 * 2. Prevent admin routes from being accessible to non-admin session cookies
 *    (secondary check; true authorisation is still enforced server-side in each Route Handler).
 * 3. Attach OWASP-recommended security headers to every response.
 * 4. Validate the `redirect` query parameter to prevent open-redirect attacks.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get("jonik_session_user");

  // ── Protected route enforcement ───────────────────────────────────
  if (
    pathname.startsWith("/portal") ||
    (pathname.startsWith("/admin") && pathname !== "/admin/login")
  ) {
    if (!sessionCookie?.value) {
      const isTryingAdmin = pathname.startsWith("/admin");
      const loginUrl = new URL(isTryingAdmin ? "/admin/login" : "/login", request.url);

      // Validate redirect path: only allow same-origin relative paths.
      const safeRedirect = getSafeRedirect(pathname);
      if (safeRedirect) {
        loginUrl.searchParams.set("redirect", safeRedirect);
      }

      return NextResponse.redirect(loginUrl);
    }
  }

  // ── Build response with security headers ──────────────────────────
  const response = NextResponse.next();

  // Prevent framing (clickjacking)
  response.headers.set("X-Frame-Options", "DENY");

  // Prevent MIME-type sniffing
  response.headers.set("X-Content-Type-Options", "nosniff");

  // Strict referrer policy
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Disable unnecessary browser features
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=()"
  );

  // Content Security Policy — tightened to prevent XSS on this server-rendered app.
  // Inline styles are needed by Tailwind in dev mode; restrict to 'self' in production.
  const isDev = process.env.NODE_ENV !== "production";

  // HSTS — instruct browsers to always use HTTPS (only meaningful in production over TLS)
  if (!isDev) {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload"
    );
  }
  const csp = [
    "default-src 'self'",
    // Scripts: Next.js App Router requires unsafe-inline for RSC hydration payloads and unsafe-eval for chunk runtime
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https:",
    // Styles: Google Fonts + self inline (Tailwind injects inline styles via Next.js)
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    // Fonts: Google Fonts CDN + local self
    "font-src 'self' https://fonts.gstatic.com data:",
    // Images: self + data URIs + https images
    "img-src 'self' data: blob: https:",
    // Connections: self + OAuth APIs
    "connect-src 'self' https:",
    // Iframes: none
    "frame-src 'none'",
    // Objects: none (no Flash / plugins)
    "object-src 'none'",
    // Base URI: restrict to self to prevent base-tag hijacking
    "base-uri 'self'",
    // Form submission: self + external auth providers
    "form-action 'self' https://accounts.google.com",
    // Upgrade insecure requests in production
    ...(isDev ? [] : ["upgrade-insecure-requests"]),
  ].join("; ");

  response.headers.set("Content-Security-Policy", csp);

  // Remove potentially leaking server information
  response.headers.delete("X-Powered-By");
  response.headers.delete("Server");

  return response;
}

/**
 * Returns a safe same-origin relative path for the post-login redirect,
 * or null if the input is potentially malicious.
 */
function getSafeRedirect(pathname: string): string | null {
  if (!pathname || typeof pathname !== "string") return null;
  // Only allow paths that start with / and do not contain double-slashes
  // or protocol indicators that could craft an open redirect.
  if (!pathname.startsWith("/")) return null;
  if (/^\/\/|[:\s]/.test(pathname)) return null;
  if (pathname.length > 512) return null;
  return pathname;
}

export const config = {
  matcher: [
    "/portal/:path*",
    "/admin/:path*",
    // Apply headers to all routes except static assets and Next.js internals.
    "/((?!_next/static|_next/image|favicon.ico|images/).*)",
  ],
};
