import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/storage";
import { setSessionUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const user = db.getUserByEmail(email);

    if (!user) {
      return NextResponse.json(
        {
          error:
            "No account found with this email. Please request access via the Investor Access page or use one of the demo accounts.",
        },
        { status: 404 }
      );
    }

    if (user.status === "suspended") {
      return NextResponse.json(
        { error: "This investor account has been suspended by an administrator." },
        { status: 403 }
      );
    }

    await setSessionUser(user.id);

    db.addAuditLog({
      actorEmail: user.email,
      actorRole: user.role,
      action: "USER_LOGIN",
      details: `User signed in with role '${user.role}' from IP ${req.headers.get("x-forwarded-for") || "local"}.`,
    });

    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Login failed" }, { status: 500 });
  }
}
