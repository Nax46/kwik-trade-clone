import { Router } from 'express'
import { z } from 'zod'
import * as content from '../controllers/content.controller.js'
import { protect } from '../middleware/auth.js'
import { validateBody } from '../middleware/validate.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const router = Router()

router.get('/settings/public', asyncHandler(content.getPublicSettings))
router.get('/resources', asyncHandler(content.listResources))
router.get('/testimonials', asyncHandler(content.listTestimonials))

router.post(
  '/newsletter',
  validateBody(z.object({ email: z.string().email() })),
  asyncHandler(content.subscribeNewsletter),
)
router.post(
  '/newsletter/subscribe',
  validateBody(z.object({ email: z.string().email() })),
  asyncHandler(content.subscribeNewsletter),
)
router.post(
  '/newsletter/unsubscribe',
  validateBody(z.object({ email: z.string().email() })),
  asyncHandler(content.unsubscribeNewsletter),
)

export default router
