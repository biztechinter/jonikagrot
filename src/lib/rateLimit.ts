/**
 * Server-side in-process rate limiter.
 * Keyed by IP address + route prefix. Intended for use in Next.js Route Handlers.
 * For production scale-out behind a load balancer, swap the Map for a Redis adapter.
 */

interface RateLimitEntry {
  count: number;
  firstRequestAt: number;
}

// Module-level store survives across requests within the same Node process.
const store = new Map<string, RateLimitEntry>();

/**
 * Check and increment the rate-limit counter for a given key.
 *
 * @param key      Unique string identifying the caller+action (e.g. "ip:1.2.3.4:login")
 * @param limit    Maximum requests allowed in the window
 * @param windowMs Time window in milliseconds
 * @returns { allowed: boolean; remaining: number; retryAfterMs: number }
 */
export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number; retryAfterMs: number } {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now - entry.firstRequestAt > windowMs) {
    // First request in a fresh window
    store.set(key, { count: 1, firstRequestAt: now });
    return { allowed: true, remaining: limit - 1, retryAfterMs: 0 };
  }

  if (entry.count >= limit) {
    const retryAfterMs = windowMs - (now - entry.firstRequestAt);
    return { allowed: false, remaining: 0, retryAfterMs };
  }

  entry.count += 1;
  store.set(key, entry);
  return { allowed: true, remaining: limit - entry.count, retryAfterMs: 0 };
}

/**
 * Derive a best-effort client IP from Next.js request headers.
 * Respects X-Forwarded-For (set by Hostinger/Vercel reverse proxies).
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return "unknown";
}
