import { Router } from 'express'
import * as analytics from '../controllers/analytics.controller.js'
import * as lead from '../controllers/lead.controller.js'
import * as booking from '../controllers/booking.controller.js'
import * as blog from '../controllers/blog.controller.js'
import * as insight from '../controllers/insight.controller.js'
import * as content from '../controllers/content.controller.js'
import * as notification from '../controllers/notification.controller.js'
import { protect } from '../middleware/auth.js'
import { validateBody, validateQuery } from '../middleware/validate.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { blogBodySchema, listBlogsQuerySchema } from '../validators/blog.validator.js'
import { listLeadsQuerySchema, updateLeadSchema } from '../validators/lead.validator.js'
import { updateBookingSchema } from '../validators/booking.validator.js'
import { z } from 'zod'

const router = Router()
router.use(protect)

router.get('/dashboard', asyncHandler(analytics.dashboard))
router.get('/analytics', asyncHandler(analytics.adminAnalytics))

router.get('/notifications', asyncHandler(notification.listNotifications))
router.patch('/notifications/read-all', asyncHandler(notification.markAllRead))
router.delete('/notifications', asyncHandler(notification.clearAllNotifications))
router.patch('/notifications/:id/read', asyncHandler(notification.markRead))
router.delete('/notifications/:id', asyncHandler(notification.deleteNotification))

router.get('/leads', validateQuery(listLeadsQuerySchema), asyncHandler(lead.listLeads))
router.patch('/leads/:id', validateBody(updateLeadSchema), asyncHandler(lead.updateLead))
router.delete('/leads/:id', asyncHandler(lead.deleteLead))

router.get('/bookings', asyncHandler(booking.listBookings))
router.patch('/bookings/:id', validateBody(updateBookingSchema), asyncHandler(booking.updateBooking))

router.get('/blogs', validateQuery(listBlogsQuerySchema), asyncHandler(blog.listBlogs))
router.get('/blogs/slug/:slug', asyncHandler(blog.getBlogBySlugAdmin))
router.post('/blogs', validateBody(blogBodySchema), asyncHandler(blog.createBlog))
router.patch('/blogs/:id', validateBody(blogBodySchema.partial()), asyncHandler(blog.updateBlog))
router.delete('/blogs/:id', asyncHandler(blog.deleteBlog))

router.get('/insights', asyncHandler(async (req, res) => {
  req.query.status = 'all'
  return insight.listInsights(req, res)
}))
router.post(
  '/insights',
  validateBody(
    z.object({
      title: z.string().min(3),
      slug: z.string().optional(),
      excerpt: z.string().min(10),
      content: z.string().min(20),
      thumbnail: z.string().optional(),
      market: z.string().optional(),
      sentiment: z.enum(['bullish', 'bearish', 'neutral']).optional(),
      status: z.enum(['draft', 'published']).optional(),
    }),
  ),
  asyncHandler(insight.createInsight),
)
router.patch('/insights/:id', asyncHandler(insight.updateInsight))
router.delete('/insights/:id', asyncHandler(insight.deleteInsight))

router.get('/resources', asyncHandler(content.listResources))
router.post(
  '/resources',
  validateBody(
    z.object({
      title: z.string().min(2),
      description: z.string().min(10),
      pdfUrl: z.string().url(),
      category: z.string().min(2),
      isActive: z.boolean().optional(),
    }),
  ),
  asyncHandler(content.createResource),
)
router.patch('/resources/:id', asyncHandler(content.updateResource))
router.delete('/resources/:id', asyncHandler(content.deleteResource))

router.get('/testimonials', asyncHandler(content.listTestimonials))
router.post(
  '/testimonials',
  validateBody(
    z.object({
      name: z.string().min(2),
      role: z.string().min(2),
      content: z.string().min(10),
      rating: z.number().min(1).max(5).optional(),
      avatarUrl: z.string().optional(),
      isPublished: z.boolean().optional(),
      order: z.number().optional(),
    }),
  ),
  asyncHandler(content.createTestimonial),
)
router.patch('/testimonials/:id', asyncHandler(content.updateTestimonial))
router.delete('/testimonials/:id', asyncHandler(content.deleteTestimonial))

router.get('/newsletter', asyncHandler(content.listNewsletter))
router.patch('/settings', asyncHandler(content.updateSettings))

export default router
