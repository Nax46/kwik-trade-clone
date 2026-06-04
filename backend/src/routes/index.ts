import { Router } from 'express'
import authRoutes from './auth.routes.js'
import contactRoutes from './contact.routes.js'
import leadRoutes from './lead.routes.js'
import bookingRoutes from './booking.routes.js'
import blogRoutes from './blog.routes.js'
import insightRoutes from './insight.routes.js'
import contentRoutes from './content.routes.js'
import analyticsRoutes from './analytics.routes.js'
import adminRoutes from './admin.routes.js'

const router = Router()

router.get('/health', (_req, res) => {
  res.json({ success: true, data: { status: 'ok', service: 'tradewithmanish-api' } })
})

router.use('/auth', authRoutes)
router.use('/contact', contactRoutes)
router.use('/leads', leadRoutes)
router.use('/bookings', bookingRoutes)
router.use('/blogs', blogRoutes)
router.use('/insights', insightRoutes)
router.use('/', contentRoutes)
router.use('/analytics', analyticsRoutes)
router.use('/admin', adminRoutes)

export default router
