import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/storage";
import { sanitizeString } from "@/lib/validation";
import { notifyAdminNewRegistration } from "@/lib/email";
import type { InvestorCategory, InvestmentInterest } from "@/types";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
    }

    const {
      organization,
      country,
      category,
      interest,
      indicativeRange,
      termsAccepted,
    } = body as {
      organization?: string;
      country?: string;
      category?: string;
      interest?: string;
      indicativeRange?: string;
      termsAccepted?: boolean;
    };

    if (!termsAccepted) {
      return NextResponse.json(
        { error: "You must accept the Confidentiality Terms of Portal Access and Privacy Policy." },
        { status: 400 }
      );
    }

    if (!organization || typeof organization !== "string" || organization.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter your organization, firm, or family office name." },
        { status: 400 }
      );
    }

    if (!country || typeof country !== "string" || country.trim().length < 2) {
      return NextResponse.json(
        { error: "Please specify your country of domicile." },
        { status: 400 }
      );
    }

    const safeOrg = sanitizeString(organization, 128);
    const safeCountry = sanitizeString(country, 128);
    const safeCategory = (category as InvestorCategory) || "Private Investor";
    const safeInterest = (interest as InvestmentInterest) || "Equity";
    const safeRange = indicativeRange ? sanitizeString(indicativeRange, 128) : "US$250,000 – US$500,000";

    // Update user record
    user.organization = safeOrg;
    user.country = safeCountry;
    user.category = safeCategory;
    user.interest = safeInterest;
    user.indicativeRange = safeRange;
    user.termsAccepted = true;
    user.termsAcceptedAt = new Date().toISOString();
    user.profileCompleted = true;
    db.saveUser(user);

    // Update AccessRequest so admin sees accurate profile in accreditation queue
    const allRequests = db.getAccessRequests();
    const existingReq = allRequests.find(
      (r) => r.businessEmail.toLowerCase() === user.email.toLowerCase()
    );

    if (existingReq) {
      existingReq.organization = safeOrg;
      existingReq.country = safeCountry;
      existingReq.category = safeCategory;
      existingReq.interest = safeInterest;
      existingReq.indicativeRange = safeRange;
      existingReq.privacyAccepted = true;
      db.saveAccessRequest(existingReq);
    }

    db.addAuditLog({
      actorEmail: user.email,
      actorRole: user.role,
      action: "PROFILE_COMPLETED",
      targetResource: user.email,
      details: `Investor ${user.name} (${user.email}) completed accreditation onboarding. Firm: ${safeOrg}, Country: ${safeCountry}, Terms Accepted.`,
    });

    // Notify admins with full investor profile details
    notifyAdminNewRegistration({
      name: user.name,
      email: user.email,
      organization: safeOrg,
      country: safeCountry,
      category: safeCategory,
      interest: safeInterest,
      indicativeRange: safeRange,
    }).catch((err) => console.error("[Email] Profile completion notification failed:", err));

    return NextResponse.json({
      success: true,
      message: "Investor profile & terms agreement recorded successfully.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        organization: user.organization,
        country: user.country,
        category: user.category,
        interest: user.interest,
        indicativeRange: user.indicativeRange,
        termsAccepted: user.termsAccepted,
        termsAcceptedAt: user.termsAcceptedAt,
        profileCompleted: user.profileCompleted,
      },
    });
  } catch (error) {
    console.error("Error completing investor profile:", error);
    return NextResponse.json({ error: "Failed to record onboarding details." }, { status: 500 });
  }
}
