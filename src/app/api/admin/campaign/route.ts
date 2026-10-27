import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/storage";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import type { CampaignRoundStatus } from "@/types";

const VALID_STATUSES = new Set<CampaignRoundStatus>([
  "active",
  "under_review",
  "closed",
  "extended",
]);

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Access denied. Administrator privileges required." }, { status: 403 });
  }

  const config = db.getCampaignWindow();
  const now = Date.now();
  const closingTime = new Date(config.closingDate).getTime();
  const diffMs = closingTime - now;
  const daysRemaining = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));

  return NextResponse.json({
    config,
    metrics: {
      daysRemaining,
      isExpired: diffMs <= 0,
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Access denied. Administrator privileges required." }, { status: 403 });
    }

    const ip = getClientIp(req);
    const rl = checkRateLimit(`admin-campaign:${ip}`, 30, 10 * 60 * 1000);
    if (!rl.allowed) {
      return NextResponse.json({ error: "Too many requests. Please slow down." }, { status: 429 });
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
    }

    const {
      roundName,
      closingDate,
      daysToAdd,
      status,
      enabled,
      targetCapital,
      institutionalNote,
    } = body as Record<string, unknown>;

    const currentConfig = db.getCampaignWindow();
    const updates: Parameters<typeof db.updateCampaignWindow>[0] = {};

    // 1. Handle closingDate or daysToAdd
    if (typeof daysToAdd === "number" && daysToAdd > 0) {
      const baseTime = Math.max(Date.now(), new Date(currentConfig.closingDate).getTime());
      const newDate = new Date(baseTime + daysToAdd * 24 * 60 * 60 * 1000);
      updates.closingDate = newDate.toISOString();
      if (currentConfig.status === "closed" || currentConfig.status === "under_review") {
        updates.status = "extended";
      }
    } else if (typeof closingDate === "string" && closingDate.trim().length > 0) {
      const parsedDate = new Date(closingDate);
      if (isNaN(parsedDate.getTime())) {
        return NextResponse.json({ error: "Invalid closing date format." }, { status: 400 });
      }
      updates.closingDate = parsedDate.toISOString();
    }

    // 2. Handle status
    if (status && typeof status === "string") {
      if (!VALID_STATUSES.has(status as CampaignRoundStatus)) {
        return NextResponse.json({ error: "Invalid round status." }, { status: 400 });
      }
      updates.status = status as CampaignRoundStatus;
    }

    // 3. Handle enabled toggle
    if (typeof enabled === "boolean") {
      updates.enabled = enabled;
    }

    // 4. Handle text fields
    if (typeof roundName === "string" && roundName.trim().length > 0) {
      updates.roundName = roundName.trim().slice(0, 150);
    }

    if (typeof targetCapital === "string" && targetCapital.trim().length > 0) {
      updates.targetCapital = targetCapital.trim().slice(0, 50);
    }

    if (typeof institutionalNote === "string") {
      updates.institutionalNote = institutionalNote.trim().slice(0, 500);
    }

    const updated = db.updateCampaignWindow(updates, user.email);
    const now = Date.now();
    const diffMs = new Date(updated.closingDate).getTime() - now;
    const daysRemaining = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));

    return NextResponse.json({
      success: true,
      config: updated,
      metrics: {
        daysRemaining,
        isExpired: diffMs <= 0,
      },
    });
  } catch (error) {
    console.error("Error updating campaign window:", error);
    return NextResponse.json({ error: "Failed to update campaign window." }, { status: 500 });
  }
}
