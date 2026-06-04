import { Router } from 'express'
import * as lead from '../controllers/lead.controller.js'
import { validateBody } from '../middleware/validate.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { createLeadSchema } from '../validators/lead.validator.js'

const router = Router()

/** Public contact form — persists as Lead in MongoDB */
router.post('/', validateBody(createLeadSchema), asyncHandler(lead.createLead))

export default router
