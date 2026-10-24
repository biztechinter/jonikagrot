import { cookies } from "next/headers";
import { User, UserRole } from "@/types";
import { db } from "./storage";

const SESSION_COOKIE_NAME = "jonik_session_user";

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
  if (!sessionCookie || !sessionCookie.value) {
    return null;
  }
  try {
    const user = db.getUserById(sessionCookie.value);
    if (!user || user.status === "suspended") {
      return null;
    }
    return user;
  } catch (err) {
    return null;
  }
}

export async function setSessionUser(userId: string): Promise<void> {
  const cookieStore = cookies();
  cookieStore.set(SESSION_COOKIE_NAME, userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearSessionUser(): Promise<void> {
  const cookieStore = cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export function canAccessDocument(userRole: UserRole, requiredRole: UserRole): boolean {
  if (userRole === "admin") return true;
  if (userRole === "approved") {
    return requiredRole === "registered" || requiredRole === "approved" || requiredRole === "public";
  }
  if (userRole === "registered") {
    return requiredRole === "registered" || requiredRole === "public";
  }
  return requiredRole === "public";
}
