import { Router } from 'express'
import { z } from 'zod'
import * as analytics from '../controllers/analytics.controller.js'
import { validateBody } from '../middleware/validate.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const router = Router()

router.post(
  '/track',
  validateBody(
    z.object({
      path: z.string().default('/'),
      visitorId: z.string().optional(),
      isUnique: z.boolean().optional(),
    }),
  ),
  asyncHandler(analytics.track),
)

export default router
