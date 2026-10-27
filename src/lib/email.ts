/**
 * Email Notification Utility — Jonik Ndovu Farm
 *
 * Supports two delivery modes:
 *  1. Resend API  — set RESEND_API_KEY in .env.local  (recommended for production)
 *  2. SMTP / Gmail — set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in .env.local
 *
 * If neither is configured, notifications are logged to the server console only
 * (useful for local development / testing without real credentials).
 */

export interface EmailPayload {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

// ── Shared brand template wrapper ────────────────────────────────────────────
function brandWrap(bodyHtml: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Jonik Ndovu Farm</title>
</head>
<body style="margin:0;padding:0;background:#f5f0e8;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0e8;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #d4c5a9;max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#1a2e1a;padding:24px 32px;">
            <p style="margin:0;font-family:'Georgia',serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#c9a96e;font-weight:bold;">
              JONIK NDOVU FARM
            </p>
            <p style="margin:4px 0 0;font-size:10px;color:#a0956b;letter-spacing:1px;text-transform:uppercase;">
              Private Investment Relations
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px;">
            ${bodyHtml}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f5f0e8;padding:20px 32px;border-top:1px solid #d4c5a9;">
            <p style="margin:0;font-size:10px;color:#8a7d6b;font-family:monospace;text-align:center;">
              This is a confidential notification from the Jonik Ndovu Farm Investor Platform.<br/>
              Naivasha, Kenya · investor.relations@jonikndovufarm.com
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── Send via Resend API ───────────────────────────────────────────────────────
async function sendViaResend(payload: EmailPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey.startsWith("re_your_api_key") || apiKey === "re_123") return false;

  const toAddresses = Array.isArray(payload.to) ? payload.to : [payload.to];

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Jonik Ndovu Farm <notifications@jonikndovufarm.com>",
      to: toAddresses,
      subject: payload.subject,
      html: payload.html,
      reply_to: payload.replyTo,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("[Email/Resend] Failed:", err);
    return false;
  }

  console.log("[Email/Resend] Sent to:", toAddresses.join(", "));
  return true;
}

// ── Send via SMTP (nodemailer) ────────────────────────────────────────────────
async function sendViaSMTP(payload: EmailPayload): Promise<boolean> {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return false;

  const cleanPass = pass.replace(/["'\s]/g, "");

  try {
    // Dynamically import nodemailer so it doesn't break if not installed
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const nodemailer = require("nodemailer");
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass: cleanPass },
    });

    const toAddresses = Array.isArray(payload.to) ? payload.to.join(", ") : payload.to;
    await transporter.sendMail({
      from: `"Jonik Ndovu Farm" <${user}>`,
      to: toAddresses,
      subject: payload.subject,
      html: payload.html,
      replyTo: payload.replyTo,
    });

    console.log("[Email/SMTP] Sent to:", toAddresses);
    return true;
  } catch (err) {
    console.error("[Email/SMTP] Failed:", err);
    return false;
  }
}

// ── Main dispatcher ───────────────────────────────────────────────────────────
export async function sendEmail(payload: EmailPayload): Promise<void> {
  const wrappedHtml = brandWrap(payload.html);
  const wrapped = { ...payload, html: wrappedHtml };

  // Try Resend first, then SMTP
  const sent = (await sendViaResend(wrapped)) || (await sendViaSMTP(wrapped));

  if (!sent) {
    // Development fallback — log to console
    const toAddresses = Array.isArray(payload.to) ? payload.to.join(", ") : payload.to;
    console.log("\n========== [Email — DEV LOG] ==========");
    console.log(`TO:      ${toAddresses}`);
    console.log(`SUBJECT: ${payload.subject}`);
    console.log("(Set RESEND_API_KEY or SMTP_* vars to send real emails)");
    console.log("========================================\n");
  }
}

// ── Admin notification helpers ────────────────────────────────────────────────

/** Returns all admin email addresses configured in env (comma-separated list) */
export function getAdminEmails(): string[] {
  const fromEnv = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  if (fromEnv.length > 0) {
    return Array.from(new Set(fromEnv));
  }

  // Fallback if no admin emails configured in .env.local
  return ["biztechinter@gmail.com"];
}

/** Notify admins when a new investor registers */
export async function notifyAdminNewRegistration(investor: {
  name: string;
  email: string;
  organization?: string;
  country?: string;
  category?: string;
  interest?: string;
  indicativeRange?: string;
}): Promise<void> {
  const adminEmails = getAdminEmails();
  const adminUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/admin/access-requests`;

  await sendEmail({
    to: adminEmails,
    subject: `[Action Required] New Investor Registration — ${investor.name}`,
    html: `
      <h2 style="font-family:'Georgia',serif;font-size:20px;color:#1a2e1a;margin:0 0 8px;">New Investor Registration</h2>
      <p style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#7a5c2e;margin:0 0 24px;font-family:monospace;">Accreditation Queue · Action Required</p>

      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #d4c5a9;margin-bottom:24px;">
        <tr style="background:#f5f0e8;">
          <td style="padding:10px 14px;font-size:11px;font-weight:bold;text-transform:uppercase;color:#3d5a3e;letter-spacing:1px;width:160px;">Full Name</td>
          <td style="padding:10px 14px;font-size:13px;color:#1a2e1a;font-weight:bold;">${investor.name}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;font-size:11px;font-weight:bold;text-transform:uppercase;color:#3d5a3e;letter-spacing:1px;">Email</td>
          <td style="padding:10px 14px;font-size:13px;color:#1a2e1a;font-family:monospace;">${investor.email}</td>
        </tr>
        <tr style="background:#f5f0e8;">
          <td style="padding:10px 14px;font-size:11px;font-weight:bold;text-transform:uppercase;color:#3d5a3e;letter-spacing:1px;">Organisation</td>
          <td style="padding:10px 14px;font-size:13px;color:#1a2e1a;">${investor.organization || "—"}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;font-size:11px;font-weight:bold;text-transform:uppercase;color:#3d5a3e;letter-spacing:1px;">Country</td>
          <td style="padding:10px 14px;font-size:13px;color:#1a2e1a;">${investor.country || "—"}</td>
        </tr>
        <tr style="background:#f5f0e8;">
          <td style="padding:10px 14px;font-size:11px;font-weight:bold;text-transform:uppercase;color:#3d5a3e;letter-spacing:1px;">Category</td>
          <td style="padding:10px 14px;font-size:13px;color:#1a2e1a;">${investor.category || "—"}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;font-size:11px;font-weight:bold;text-transform:uppercase;color:#3d5a3e;letter-spacing:1px;">Interest</td>
          <td style="padding:10px 14px;font-size:13px;color:#1a2e1a;">${investor.interest || "—"}</td>
        </tr>
        <tr style="background:#f5f0e8;">
          <td style="padding:10px 14px;font-size:11px;font-weight:bold;text-transform:uppercase;color:#3d5a3e;letter-spacing:1px;">Indicative Size</td>
          <td style="padding:10px 14px;font-size:13px;color:#1a2e1a;font-family:monospace;">${investor.indicativeRange || "Not stated"}</td>
        </tr>
      </table>

      <p style="font-size:12px;color:#555;margin-bottom:20px;">
        This investor has been registered as <strong>Tier 2 (Registered)</strong> and is awaiting your review for Tier 3 Diligence Access.
      </p>

      <a href="${adminUrl}" style="display:inline-block;background:#1a2e1a;color:#f5f0e8;text-decoration:none;padding:12px 24px;font-size:11px;font-family:monospace;letter-spacing:2px;text-transform:uppercase;font-weight:bold;">
        Review Application →
      </a>
    `,
    replyTo: investor.email,
  });
}

/** Notify admins when a registered investor requests Tier 3 upgrade */
export async function notifyAdminTierUpgradeRequest(investor: {
  name: string;
  email: string;
  organization?: string;
  indicativeRange?: string;
}): Promise<void> {
  const adminEmails = getAdminEmails();
  const adminUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/admin/access-requests`;

  await sendEmail({
    to: adminEmails,
    subject: `[Tier 3 Request] NDA Executed — ${investor.name} Requesting Diligence Access`,
    html: `
      <h2 style="font-family:'Georgia',serif;font-size:20px;color:#1a2e1a;margin:0 0 8px;">Tier 3 Upgrade Request</h2>
      <p style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#7a5c2e;margin:0 0 24px;font-family:monospace;">NDA Executed · Diligence Access Pending</p>

      <p style="font-size:13px;color:#333;margin-bottom:20px;">
        <strong>${investor.name}</strong> (${investor.email}) has electronically executed the Non-Disclosure Agreement and 
        is requesting <strong>Tier 3 Full Data Room access</strong> on the investor portal.
      </p>

      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #d4c5a9;margin-bottom:24px;">
        <tr style="background:#f5f0e8;">
          <td style="padding:10px 14px;font-size:11px;font-weight:bold;text-transform:uppercase;color:#3d5a3e;letter-spacing:1px;width:160px;">Investor</td>
          <td style="padding:10px 14px;font-size:13px;color:#1a2e1a;font-weight:bold;">${investor.name}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;font-size:11px;font-weight:bold;text-transform:uppercase;color:#3d5a3e;letter-spacing:1px;">Email</td>
          <td style="padding:10px 14px;font-size:13px;color:#1a2e1a;font-family:monospace;">${investor.email}</td>
        </tr>
        <tr style="background:#f5f0e8;">
          <td style="padding:10px 14px;font-size:11px;font-weight:bold;text-transform:uppercase;color:#3d5a3e;letter-spacing:1px;">Organisation</td>
          <td style="padding:10px 14px;font-size:13px;color:#1a2e1a;">${investor.organization || "—"}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;font-size:11px;font-weight:bold;text-transform:uppercase;color:#3d5a3e;letter-spacing:1px;">Indicative Range</td>
          <td style="padding:10px 14px;font-size:13px;color:#1a2e1a;font-family:monospace;">${investor.indicativeRange || "Not stated"}</td>
        </tr>
        <tr style="background:#f5ef8f;">
          <td style="padding:10px 14px;font-size:11px;font-weight:bold;text-transform:uppercase;color:#5a3a00;letter-spacing:1px;">NDA Status</td>
          <td style="padding:10px 14px;font-size:13px;color:#5a3a00;font-weight:bold;">✓ Digital NDA Executed</td>
        </tr>
      </table>

      <a href="${adminUrl}" style="display:inline-block;background:#7a5c2e;color:#f5f0e8;text-decoration:none;padding:12px 24px;font-size:11px;font-family:monospace;letter-spacing:2px;text-transform:uppercase;font-weight:bold;">
        Grant / Review Access →
      </a>
    `,
    replyTo: investor.email,
  });
}

/** Notify admins when an investor submits a new inquiry/message */
export async function notifyAdminNewInquiry(inquiry: {
  investorName: string;
  investorEmail: string;
  type: string;
  subject: string;
  message: string;
  preferredDate?: string;
}): Promise<void> {
  const adminEmails = getAdminEmails();
  const adminUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/admin/inquiries`;

  await sendEmail({
    to: adminEmails,
    subject: `[Investor Message] ${inquiry.type} — ${inquiry.subject}`,
    html: `
      <h2 style="font-family:'Georgia',serif;font-size:20px;color:#1a2e1a;margin:0 0 8px;">New Investor Inquiry</h2>
      <p style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#7a5c2e;margin:0 0 24px;font-family:monospace;">${inquiry.type}</p>

      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #d4c5a9;margin-bottom:20px;">
        <tr style="background:#f5f0e8;">
          <td style="padding:10px 14px;font-size:11px;font-weight:bold;text-transform:uppercase;color:#3d5a3e;letter-spacing:1px;width:140px;">From</td>
          <td style="padding:10px 14px;font-size:13px;color:#1a2e1a;font-weight:bold;">${inquiry.investorName} &lt;${inquiry.investorEmail}&gt;</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;font-size:11px;font-weight:bold;text-transform:uppercase;color:#3d5a3e;letter-spacing:1px;">Subject</td>
          <td style="padding:10px 14px;font-size:13px;color:#1a2e1a;">${inquiry.subject}</td>
        </tr>
        ${inquiry.preferredDate ? `
        <tr style="background:#f5f0e8;">
          <td style="padding:10px 14px;font-size:11px;font-weight:bold;text-transform:uppercase;color:#3d5a3e;letter-spacing:1px;">Preferred Date</td>
          <td style="padding:10px 14px;font-size:13px;color:#1a2e1a;">${inquiry.preferredDate}</td>
        </tr>` : ""}
      </table>

      <div style="background:#f5f0e8;border-left:4px solid #7a5c2e;padding:16px 20px;margin-bottom:24px;">
        <p style="margin:0;font-size:13px;color:#333;line-height:1.7;">${inquiry.message.replace(/\n/g, "<br/>")}</p>
      </div>

      <a href="${adminUrl}" style="display:inline-block;background:#1a2e1a;color:#f5f0e8;text-decoration:none;padding:12px 24px;font-size:11px;font-family:monospace;letter-spacing:2px;text-transform:uppercase;font-weight:bold;">
        View All Inquiries →
      </a>
    `,
    replyTo: inquiry.investorEmail,
  });
}
