import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/storage";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import type { UserRole } from "@/types";

const ALLOWED_ROLES: UserRole[] = ["registered", "approved", "admin"];
const ALLOWED_ACTIONS = new Set(["APPROVE_REQUEST", "REJECT_REQUEST", "UPDATE_USER_ROLE"]);

// Max 60 admin write operations per IP per 10 minutes.
const ADMIN_WRITE_LIMIT = 60;
const ADMIN_WINDOW_MS = 10 * 60 * 1000;

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Access denied. Administrator privileges required." }, { status: 403 });
  }

  // Strip internal verification codes from user list before sending.
  const users = db.getUsers().map(({ verificationCode: _vc, ...u }) => u);

  return NextResponse.json({
    users,
    accessRequests: db.getAccessRequests(),
  });
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Access denied." }, { status: 403 });
    }

    // Rate-limit admin write operations.
    const ip = getClientIp(req);
    const rl = checkRateLimit(`admin-write:${ip}`, ADMIN_WRITE_LIMIT, ADMIN_WINDOW_MS);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: "Too many operations. Please slow down." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }
    const { action, userId, requestId, targetRole, status } = body as Record<string, unknown>;

    // Validate action against a strict whitelist.
    if (!action || !ALLOWED_ACTIONS.has(action as string)) {
      return NextResponse.json({ error: "Invalid or unsupported action." }, { status: 400 });
    }

    if (action === "APPROVE_REQUEST") {
      const allRequests = db.getAccessRequests();
      const reqObj = allRequests.find((r) => r.id === requestId);
      if (!reqObj) {
        return NextResponse.json({ error: "Request not found" }, { status: 404 });
      }

      reqObj.status = "approved";
      const approvedRole: UserRole = ALLOWED_ROLES.includes(targetRole as UserRole)
        ? (targetRole as UserRole)
        : "approved";
      reqObj.assignedRole = approvedRole;
      reqObj.reviewedAt = new Date().toISOString();
      reqObj.reviewedBy = user.email;
      db.saveAccessRequest(reqObj);

      // Also elevate user account
      const matchedUser = db.getUserByEmail(reqObj.businessEmail);
      if (matchedUser) {
        matchedUser.role = approvedRole;
        matchedUser.approvedAt = new Date().toISOString();
        matchedUser.approvedBy = user.email;
        db.saveUser(matchedUser);
      }

      db.addAuditLog({
        actorEmail: user.email,
        actorRole: "admin",
        action: "ACCESS_REQUEST_APPROVED",
        targetResource: reqObj.businessEmail,
        details: `Administrator approved investor access for ${reqObj.fullName} (${reqObj.businessEmail}) with role '${reqObj.assignedRole}'.`,
      });

      return NextResponse.json({ success: true, message: "Request approved and tier updated." });
    }

    if (action === "REJECT_REQUEST") {
      const allRequests = db.getAccessRequests();
      const reqObj = allRequests.find((r) => r.id === requestId);
      if (!reqObj) {
        return NextResponse.json({ error: "Request not found" }, { status: 404 });
      }

      reqObj.status = "rejected";
      reqObj.reviewedAt = new Date().toISOString();
      reqObj.reviewedBy = user.email;
      db.saveAccessRequest(reqObj);

      db.addAuditLog({
        actorEmail: user.email,
        actorRole: "admin",
        action: "ACCESS_REQUEST_REJECTED",
        targetResource: reqObj.businessEmail,
        details: `Administrator rejected investor access request from ${reqObj.fullName} (${reqObj.businessEmail}).`,
      });

      return NextResponse.json({ success: true, message: "Request rejected." });
    }

    if (action === "UPDATE_USER_ROLE") {
      if (!userId || typeof userId !== "string") {
        return NextResponse.json({ error: "User ID is required." }, { status: 400 });
      }
      if (!targetRole || !ALLOWED_ROLES.includes(targetRole as UserRole)) {
        return NextResponse.json({ error: "Invalid target role." }, { status: 400 });
      }

      const targetUser = db.getUserById(userId as string);
      if (!targetUser) {
        return NextResponse.json({ error: "User not found." }, { status: 404 });
      }

      // Prevent an admin from demoting themselves.
      if (targetUser.id === user.id && targetRole !== "admin") {
        return NextResponse.json(
          { error: "Administrators cannot change their own role." },
          { status: 400 }
        );
      }

      const prevRole = targetUser.role;
      targetUser.role = targetRole as UserRole;
      if (status === "active" || status === "suspended") {
        targetUser.status = status;
      }
      db.saveUser(targetUser);

      db.addAuditLog({
        actorEmail: user.email,
        actorRole: "admin",
        action: "USER_ROLE_CHANGED",
        targetResource: targetUser.email,
        ipAddress: ip,
        details: `Administrator updated role for ${targetUser.email} from '${prevRole}' to '${targetRole}'. Status: '${targetUser.status}'.`,
      });

      const { verificationCode: _vc, ...safeTargetUser } = targetUser;
      return NextResponse.json({ success: true, user: safeTargetUser });
    }

    return NextResponse.json({ error: "Invalid action." }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Operation failed." }, { status: 500 });
  }
}
