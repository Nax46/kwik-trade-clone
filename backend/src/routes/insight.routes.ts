import { Router } from 'express'
import * as insight from '../controllers/insight.controller.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const router = Router()

router.get('/', asyncHandler(async (req, res) => {
  req.query.status = req.query.status ?? 'published'
  return insight.listInsights(req, res)
}))
router.get('/:slug', asyncHandler(insight.getInsightBySlug))

export default router
