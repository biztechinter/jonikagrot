/**
 * Server-side input sanitisation and validation helpers.
 * Never rely on client-side validation alone for security-sensitive operations.
 */

/**
 * Strip all HTML tags and normalise whitespace.
 * Prevents stored XSS from user-supplied strings saved in db.json.
 */
export function sanitizeString(input: unknown, maxLength = 2048): string {
  if (typeof input !== "string") return "";
  // Remove HTML/script tags
  const stripped = input.replace(/<[^>]*>/g, "").replace(/[<>]/g, "");
  return stripped.trim().slice(0, maxLength);
}

/**
 * Validate that a string is a plausible email address.
 * RFC 5322 simplified — suitable for pre-save validation.
 */
export function isValidEmail(input: unknown): boolean {
  if (typeof input !== "string") return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return emailRegex.test(input.trim()) && input.length <= 320;
}

/**
 * Validate that a country string is non-empty and safe.
 */
export function isValidCountry(input: unknown): boolean {
  if (typeof input !== "string") return false;
  return input.trim().length >= 2 && input.trim().length <= 100;
}

/**
 * Validate that a full name is non-empty and plausible.
 */
export function isValidName(input: unknown): boolean {
  if (typeof input !== "string") return false;
  const trimmed = input.trim();
  return trimmed.length >= 2 && trimmed.length <= 256;
}

/**
 * Validate a 6-digit numeric verification code.
 */
export function isValidVerificationCode(input: unknown): boolean {
  if (typeof input !== "string") return false;
  return /^\d{6}$/.test(input.trim());
}

/**
 * Allowed enumeration values for investor categories.
 */
const VALID_INVESTOR_CATEGORIES = new Set([
  "Private Investor",
  "Family Office or Investment Company",
  "Hospitality or Strategic Investor",
  "Institutional Investor",
  "Professional Adviser",
  "Other",
]);

/**
 * Allowed enumeration values for investment interests.
 */
const VALID_INVESTMENT_INTERESTS = new Set([
  "Equity",
  "Debt or Structured Financing",
  "Joint Venture or Strategic Partnership",
  "Exploring Options",
]);

export function isValidInvestorCategory(input: unknown): boolean {
  return typeof input === "string" && VALID_INVESTOR_CATEGORIES.has(input);
}

export function isValidInvestmentInterest(input: unknown): boolean {
  return typeof input === "string" && VALID_INVESTMENT_INTERESTS.has(input);
}

/**
 * Validate and normalise a URL so only http/https are accepted.
 * Returns null if the URL is invalid or uses a dangerous protocol.
 */
export function sanitizeRedirectUrl(input: string | null, base: string): string | null {
  if (!input) return null;
  try {
    const parsed = new URL(input, base);
    if (parsed.origin !== new URL(base).origin) return null; // Must be same-origin
    if (!["http:", "https:"].includes(parsed.protocol)) return null;
    return parsed.pathname + parsed.search;
  } catch {
    return null;
  }
}
