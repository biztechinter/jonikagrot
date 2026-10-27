import { NextResponse } from "next/server";
import { db } from "@/lib/storage";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const config = db.getCampaignWindow();
    const now = Date.now();
    const closingTime = new Date(config.closingDate).getTime();
    const diffMs = closingTime - now;

    // Remaining whole days
    const daysRemaining = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
    const hoursRemaining = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60)));

    const isExpired = diffMs <= 0;

    return NextResponse.json({
      config,
      metrics: {
        daysRemaining,
        hoursRemaining,
        isExpired,
        effectiveStatus: isExpired && config.status === "active" ? "under_review" : config.status,
      },
    });
  } catch (error) {
    console.error("Error fetching campaign window:", error);
    return NextResponse.json(
      { error: "Failed to retrieve campaign schedule." },
      { status: 500 }
    );
  }
}
