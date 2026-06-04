import { Router } from 'express'
import * as booking from '../controllers/booking.controller.js'
import { validateBody, validateQuery } from '../middleware/validate.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { availabilityQuerySchema, createBookingSchema } from '../validators/booking.validator.js'

const router = Router()

router.get(
  '/availability',
  validateQuery(availabilityQuerySchema),
  asyncHandler(booking.getAvailability),
)
router.post('/', validateBody(createBookingSchema), asyncHandler(booking.createBooking))

export default router
