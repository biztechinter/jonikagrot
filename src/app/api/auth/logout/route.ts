import { NextRequest, NextResponse } from "next/server";
import { clearSessionUser, getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/storage";
import { getClientIp } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const user = await getCurrentUser();
  if (user) {
    db.addAuditLog({
      actorEmail: user.email,
      actorRole: user.role,
      action: "USER_LOGOUT",
      ipAddress: ip,
      details: `User signed out. IP: ${ip}.`,
    });
  }
  await clearSessionUser();
  return NextResponse.json(
    { success: true },
    {
      headers: {
        "Cache-Control": "no-store",
        "Clear-Site-Data": '"cookies"',
      },
    }
  );
}
