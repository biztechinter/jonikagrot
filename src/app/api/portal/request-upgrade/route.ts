import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/storage";
import { sanitizeString } from "@/lib/validation";
import { notifyAdminTierUpgradeRequest } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    }

    if (user.role === "approved" || user.role === "admin") {
      return NextResponse.json(
        { error: "You already have Tier 3 Approved Diligence access." },
        { status: 400 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
    }

    const { ndaAccepted, indicativeRange, message } = body as {
      ndaAccepted?: boolean;
      indicativeRange?: string;
      message?: string;
    };

    if (!ndaAccepted) {
      return NextResponse.json(
        { error: "You must review and electronically accept the Non-Disclosure Agreement (NDA) to request Tier 3 diligence access." },
        { status: 400 }
      );
    }

    if (indicativeRange && typeof indicativeRange === "string") {
      user.indicativeRange = sanitizeString(indicativeRange, 128);
    }

    const updatedUser = db.requestTierUpgrade(user.id, true);

    if (!updatedUser) {
      return NextResponse.json({ error: "Failed to update accreditation status." }, { status: 500 });
    }

    // ── Notify admins (fire-and-forget) ──────────────────────────────────
    notifyAdminTierUpgradeRequest({
      name: updatedUser.name,
      email: updatedUser.email,
      organization: updatedUser.organization,
      indicativeRange: updatedUser.indicativeRange,
    }).catch((err) => console.error("[Email] Tier upgrade notification failed:", err));

    return NextResponse.json({
      success: true,
      message: "Your application for Tier 3 Diligence Access & NDA has been submitted. The project sponsor will review your accreditation.",
      user: {
        id: updatedUser.id,
        role: updatedUser.role,
        ndaAccepted: updatedUser.ndaAccepted,
        ndaAcceptedAt: updatedUser.ndaAcceptedAt,
        diligenceRequestedAt: updatedUser.diligenceRequestedAt,
      },
    });
  } catch (error) {
    console.error("Error requesting tier upgrade:", error);
    return NextResponse.json({ error: "Server error processing application." }, { status: 500 });
  }
}
