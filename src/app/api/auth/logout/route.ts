import { NextRequest, NextResponse } from "next/server";
import { clearSessionUser, getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/storage";

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (user) {
    db.addAuditLog({
      actorEmail: user.email,
      actorRole: user.role,
      action: "USER_LOGOUT",
      details: "User signed out.",
    });
  }
  await clearSessionUser();
  return NextResponse.json({ success: true });
}
