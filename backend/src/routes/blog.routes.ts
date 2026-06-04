import { Router } from 'express'
import * as blog from '../controllers/blog.controller.js'
import { validateQuery } from '../middleware/validate.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { listBlogsQuerySchema } from '../validators/blog.validator.js'

const router = Router()

router.get(
  '/',
  validateQuery(listBlogsQuerySchema),
  asyncHandler(async (req, res) => {
    if (!req.query.status) req.query.status = 'published'
    return blog.listBlogs(req, res)
  }),
)
router.get('/:slug', asyncHandler(blog.getBlogBySlug))

export default router
