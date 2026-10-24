import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/storage";

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Access denied. Administrator privileges required." }, { status: 403 });
  }

  return NextResponse.json({
    users: db.getUsers(),
    accessRequests: db.getAccessRequests(),
  });
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Access denied." }, { status: 403 });
    }

    const body = await req.json();
    const { action, userId, requestId, targetRole, status } = body;

    if (action === "APPROVE_REQUEST") {
      const allRequests = db.getAccessRequests();
      const reqObj = allRequests.find((r) => r.id === requestId);
      if (!reqObj) {
        return NextResponse.json({ error: "Request not found" }, { status: 404 });
      }

      reqObj.status = "approved";
      reqObj.assignedRole = targetRole || "approved";
      reqObj.reviewedAt = new Date().toISOString();
      reqObj.reviewedBy = user.email;
      db.saveAccessRequest(reqObj);

      // Also elevate user account
      const matchedUser = db.getUserByEmail(reqObj.businessEmail);
      if (matchedUser) {
        matchedUser.role = targetRole || "approved";
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
      const targetUser = db.getUserById(userId);
      if (!targetUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      const prevRole = targetUser.role;
      targetUser.role = targetRole;
      if (status) targetUser.status = status;
      db.saveUser(targetUser);

      db.addAuditLog({
        actorEmail: user.email,
        actorRole: "admin",
        action: "USER_ROLE_CHANGED",
        targetResource: targetUser.email,
        details: `Administrator updated role for ${targetUser.email} from '${prevRole}' to '${targetRole}'. Status: '${targetUser.status}'.`,
      });

      return NextResponse.json({ success: true, user: targetUser });
    }

    return NextResponse.json({ error: "Invalid action." }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Operation failed." }, { status: 500 });
  }
}
