import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import type { Response } from 'express'
import { env } from '../config/env.js'
import type { AuthRequest } from '../middleware/auth.js'
import { User } from '../models/User.js'
import { sendPasswordResetEmail } from '../services/email.service.js'
import { ApiError } from '../utils/ApiError.js'
import { sendSuccess } from '../utils/response.js'

function signToken(userId: string): string {
  return jwt.sign({ id: userId }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
  })
}

export async function login(req: AuthRequest, res: Response) {
  const { email, password } = req.body as { email: string; password: string }
  const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password')
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid email or password')
  }
  const token = signToken(user._id.toString())
  sendSuccess(res, {
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  })
}

export async function logout(_req: AuthRequest, res: Response) {
  sendSuccess(res, null, 200, 'Logged out successfully')
}

export async function me(req: AuthRequest, res: Response) {
  const user = req.user!
  sendSuccess(res, {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  })
}

export async function updateProfile(req: AuthRequest, res: Response) {
  const user = req.user!
  const { name, email } = req.body as { name?: string; email?: string }
  if (name) user.name = name
  if (email) user.email = email
  await user.save()
  sendSuccess(res, { id: user._id, name: user.name, email: user.email })
}

export async function forgotPassword(req: AuthRequest, res: Response) {
  const { email } = req.body as { email: string }
  const user = await User.findOne({ email })
  if (!user) {
    sendSuccess(res, null, 200, 'If that email exists, a reset link was sent')
    return
  }
  const rawToken = crypto.randomBytes(32).toString('hex')
  const hashed = crypto.createHash('sha256').update(rawToken).digest('hex')
  user.resetPasswordToken = hashed
  user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000)
  await user.save({ validateBeforeSave: false })

  const resetUrl = `${env.FRONTEND_URL}/admin/reset-password?token=${rawToken}`
  await sendPasswordResetEmail(user.email, resetUrl)
  sendSuccess(res, null, 200, 'If that email exists, a reset link was sent')
}

export async function resetPassword(req: AuthRequest, res: Response) {
  const { token, password } = req.body as { token: string; password: string }
  const hashed = crypto.createHash('sha256').update(token).digest('hex')
  const user = await User.findOne({
    resetPasswordToken: hashed,
    resetPasswordExpires: { $gt: new Date() },
  }).select('+password +resetPasswordToken +resetPasswordExpires')

  if (!user) throw new ApiError(400, 'Invalid or expired reset token')

  user.password = password
  user.resetPasswordToken = undefined
  user.resetPasswordExpires = undefined
  await user.save()

  sendSuccess(res, null, 200, 'Password updated successfully')
}
