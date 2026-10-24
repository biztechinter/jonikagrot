import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/storage";

export async function POST(req: NextRequest) {
  try {
    const { email, code } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const user = db.getUserByEmail(email);
    if (!user) {
      return NextResponse.json({ error: "Account not found." }, { status: 404 });
    }

    // Accept user's assigned code or standard verification code
    const expectedCode = user.verificationCode || "123456";
    if (code && code.trim() !== expectedCode && code.trim() !== "123456") {
      return NextResponse.json(
        { error: "Invalid verification code. Please check your email or use the demo code 123456." },
        { status: 400 }
      );
    }

    user.emailVerified = true;
    db.saveUser(user);

    // Also update any matching access requests
    const allReqs = db.getAccessRequests();
    const matchReq = allReqs.find((r) => r.businessEmail.toLowerCase() === email.toLowerCase());
    if (matchReq) {
      matchReq.emailVerified = true;
      db.saveAccessRequest(matchReq);
    }

    db.addAuditLog({
      actorEmail: user.email,
      actorRole: user.role,
      action: "EMAIL_VERIFIED",
      details: `Investor email verified successfully.`,
    });

    return NextResponse.json({
      success: true,
      message: "Email address verified successfully. Tier 2 permissions activated.",
      user,
    });
  } catch (err: any) {
    return NextResponse.json({ error: "Verification failed." }, { status: 500 });
  }
}
