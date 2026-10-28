import crypto from "crypto";

const PBKDF2_ITERATIONS = 100000;
const PBKDF2_KEYLEN = 64;
const PBKDF2_DIGEST = "sha512";

// The admin security passkey MUST be set via ADMIN_SECURITY_KEY environment variable.
// No default fallback is provided — an unset variable will cause all passkey verification to fail,
// preventing unauthorised admin access if the env var is accidentally omitted in production.
export const DEFAULT_ADMIN_SECURITY_KEY = process.env.ADMIN_SECURITY_KEY || "";

/**
 * Hash a plaintext password with a unique salt using PBKDF2 (SHA-512, 100k rounds)
 */
export function hashPassword(password: string): { hash: string; salt: string } {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, PBKDF2_KEYLEN, PBKDF2_DIGEST)
    .toString("hex");
  return { hash, salt };
}

/**
 * Verify a plaintext password against a stored hash and salt in constant time
 */
export function verifyPassword(password: string, storedHash: string, storedSalt: string): boolean {
  if (!password || !storedHash || !storedSalt) return false;
  try {
    const computedHash = crypto
      .pbkdf2Sync(password, storedSalt, PBKDF2_ITERATIONS, PBKDF2_KEYLEN, PBKDF2_DIGEST)
      .toString("hex");

    const a = Buffer.from(computedHash, "hex");
    const b = Buffer.from(storedHash, "hex");
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

/**
 * Verify an administrative security passkey in constant time
 */
export function verifyAdminSecurityPasskey(passkey: string): boolean {
  if (!passkey) return false;
  const expectedKey = process.env.ADMIN_SECURITY_KEY || DEFAULT_ADMIN_SECURITY_KEY;
  const a = Buffer.from(passkey.trim());
  const b = Buffer.from(expectedKey.trim());
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

/**
 * Generate a cryptographically secure random session token
 */
export function generateSecureToken(): string {
  return crypto.randomBytes(32).toString("hex");
}
