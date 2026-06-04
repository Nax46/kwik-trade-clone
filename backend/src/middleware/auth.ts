import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { User, type IUser } from '../models/User.js'
import { ApiError } from '../utils/ApiError.js'

export interface AuthRequest extends Request {
  user?: IUser
}

export const protect = async (req: AuthRequest, _res: Response, next: NextFunction) => {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    throw new ApiError(401, 'Not authorized')
  }
  const token = header.split(' ')[1]
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string }
    const user = await User.findById(decoded.id).select('+password')
    if (!user) throw new ApiError(401, 'User not found')
    req.user = user
    next()
  } catch {
    throw new ApiError(401, 'Invalid or expired token')
  }
}
