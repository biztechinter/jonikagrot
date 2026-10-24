import { NextResponse } from "next/server";
import { getCurrentUser, canAccessDocument } from "@/lib/auth";
import { db } from "@/lib/storage";

export async function GET() {
  const user = await getCurrentUser();
  const allDocs = db.getDocuments();

  // If user is not authenticated, only public docs (none by default, or just basic metadata)
  const userRole = user ? user.role : "public";

  const enrichedDocs = allDocs.map((doc) => {
    const hasAccess = canAccessDocument(userRole, doc.requiredRole);
    return {
      ...doc,
      userHasAccess: hasAccess,
    };
  });

  return NextResponse.json({
    user: user || null,
    documents: enrichedDocs,
  });
}
