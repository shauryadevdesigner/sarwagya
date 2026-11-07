// In-memory sliding-window IP rate limiter
interface RateLimitRecord {
  count: number
  resetTime: number
}

const ipMap = new Map<string, RateLimitRecord>()

// Periodically clean up stale records every 10 minutes
setInterval(() => {
  const now = Date.now()
  for (const [ip, record] of ipMap.entries()) {
    if (now > record.resetTime) {
      ipMap.delete(ip)
    }
  }
}, 10 * 60 * 1000)

/**
 * Validates request rate limit.
 * Defaults to max 5 inquiry requests per IP per 15 minutes window.
 */
export function checkRateLimit(ip: string, limit = 5, windowMs = 15 * 60 * 1000): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const record = ipMap.get(ip)

  if (!record || now > record.resetTime) {
    ipMap.set(ip, { count: 1, resetTime: now + windowMs })
    return { allowed: true, remaining: limit - 1 }
  }

  if (record.count >= limit) {
    return { allowed: false, remaining: 0 }
  }

  record.count += 1
  return { allowed: true, remaining: limit - record.count }
}

