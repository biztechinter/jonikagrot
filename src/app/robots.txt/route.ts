import { NextResponse } from "next/server";

export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://jonikndovufarm.com";

  const robotsTxt = `# Jonik Ndovu Farm — robots.txt
# Authentication and authorisation enforces private content protection.
# The following rules additionally discourage search engines from indexing
# the investor portal and administrative areas. These rules are NOT a
# security control and must not be relied upon as one.

User-agent: *
Allow: /
Disallow: /portal/
Disallow: /admin/
Disallow: /api/
Disallow: /login
Disallow: /register
Disallow: /verify-email
Disallow: /forgot-password

Sitemap: ${appUrl}/sitemap.xml
`;

  return new NextResponse(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
