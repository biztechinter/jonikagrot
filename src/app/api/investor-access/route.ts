import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/storage";
import { setSessionUser } from "@/lib/auth";
import { AccessRequest, User } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      businessEmail,
      organization,
      country,
      category,
      interest,
      indicativeRange,
      message,
      privacyAccepted,
    } = body;

    if (!fullName || !businessEmail || !country || !category || !interest) {
      return NextResponse.json(
        { error: "Please provide all required fields." },
        { status: 400 }
      );
    }

    if (!privacyAccepted) {
      return NextResponse.json(
        { error: "You must accept the confidentiality terms to proceed." },
        { status: 400 }
      );
    }

    // Check if user already exists
    let existingUser = db.getUserByEmail(businessEmail);

    const requestId = "req-" + Date.now();
    const newRequest: AccessRequest = {
      id: requestId,
      fullName,
      businessEmail,
      organization: organization || "",
      country,
      category,
      interest,
      indicativeRange: indicativeRange || "",
      message: message || "",
      privacyAccepted: true,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    db.saveAccessRequest(newRequest);

    let userId: string;
    if (existingUser) {
      userId = existingUser.id;
      existingUser.organization = organization || existingUser.organization;
      existingUser.country = country || existingUser.country;
      existingUser.category = category;
      existingUser.interest = interest;
      existingUser.indicativeRange = indicativeRange;
      db.saveUser(existingUser);
    } else {
      userId = "usr-" + Date.now();
      const newUser: User = {
        id: userId,
        email: businessEmail,
        name: fullName,
        organization,
        country,
        role: "registered",
        category,
        interest,
        indicativeRange,
        status: "active",
        emailVerified: false,
        verificationCode: "123456",
        createdAt: new Date().toISOString(),
        notes: `Registered via Investor Access form. Awaiting email verification and Tier 3 diligence review.`,
      };
      db.saveUser(newUser);
    }

    // Sign in the user session
    await setSessionUser(userId);

    db.addAuditLog({
      actorEmail: businessEmail,
      actorRole: "registered",
      action: "ACCESS_REQUEST_SUBMITTED",
      details: `New investor application submitted by ${fullName} (${category}, ${country}). Email verification pending.`,
    });

    const userObj = db.getUserById(userId);

    return NextResponse.json({
      success: true,
      message: "Application recorded successfully.",
      verificationRequired: !userObj?.emailVerified,
      verificationCode: "123456",
      user: userObj,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to process application." },
      { status: 500 }
    );
  }
}
