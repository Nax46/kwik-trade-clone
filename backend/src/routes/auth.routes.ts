import { Router } from 'express'
import * as auth from '../controllers/auth.controller.js'
import { protect } from '../middleware/auth.js'
import { validateBody } from '../middleware/validate.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import {
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
  updateProfileSchema,
} from '../validators/auth.validator.js'

const router = Router()

router.post('/login', validateBody(loginSchema), asyncHandler(auth.login))
router.post('/logout', asyncHandler(auth.logout))
router.post(
  '/forgot-password',
  validateBody(forgotPasswordSchema),
  asyncHandler(auth.forgotPassword),
)
router.post(
  '/reset-password',
  validateBody(resetPasswordSchema),
  asyncHandler(auth.resetPassword),
)
router.get('/me', protect, asyncHandler(auth.me))
router.patch('/profile', protect, validateBody(updateProfileSchema), asyncHandler(auth.updateProfile))

export default router
