import { NextResponse } from "next/server";
import { getCurrentUser, canAccessDocument } from "@/lib/auth";
import { db } from "@/lib/storage";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json(
      { error: "Authentication required to access the confidential data room." },
      { status: 401 }
    );
  }

  const allDocs = db.getDocuments();
  const enrichedDocs = allDocs.map((doc) => {
    const hasAccess = canAccessDocument(user.role, doc.requiredRole);
    return {
      ...doc,
      userHasAccess: hasAccess,
    };
  });

  // Strip all sensitive server-side fields before sending to the browser.
  const { passwordHash: _ph, passwordSalt: _ps, verificationCode: _vc, notes: _n, ...safeUser } = user;

  return NextResponse.json({
    user: safeUser,
    documents: enrichedDocs,
  });
}
