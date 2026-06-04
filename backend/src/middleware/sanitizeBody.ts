import type { NextFunction, Request, Response } from 'express'

function sanitizeObject<T>(value: T): T {
  if (value === null || typeof value !== 'object') return value
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeObject(item)) as T
  }
  const clean: Record<string, unknown> = {}
  for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
    if (key.startsWith('$') || key.includes('.')) continue
    clean[key] = sanitizeObject(val)
  }
  return clean as T
}

/** Body-only sanitizer (compatible with Express 5; avoids mutating req.query). */
export function sanitizeBody(req: Request, _res: Response, next: NextFunction) {
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizeObject(req.body)
  }
  next()
}
