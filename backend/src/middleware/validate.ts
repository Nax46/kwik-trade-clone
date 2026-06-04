import type { NextFunction, Request, Response } from 'express'
import type { ZodSchema } from 'zod'
import { ApiError } from '../utils/ApiError.js'

export function validateBody<T>(schema: ZodSchema<T>) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      throw new ApiError(400, 'Validation failed', result.error.issues)
    }
    req.body = result.data
    next()
  }
}

export function validateQuery<T>(schema: ZodSchema<T>) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query)
    if (!result.success) {
      throw new ApiError(400, 'Invalid query parameters', result.error.issues)
    }
    const parsed = result.data as Record<string, unknown>
    for (const key of Object.keys(req.query)) {
      delete (req.query as Record<string, unknown>)[key]
    }
    Object.assign(req.query as Record<string, unknown>, parsed)
    next()
  }
}
