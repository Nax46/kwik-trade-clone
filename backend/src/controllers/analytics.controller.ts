import type { Response } from 'express'
import type { AuthRequest } from '../middleware/auth.js'
import { trackVisit, getAnalyticsSummary } from '../services/analytics.service.js'
import { sendSuccess } from '../utils/response.js'
import { Blog } from '../models/Blog.js'
import { Lead } from '../models/Lead.js'
import { Booking } from '../models/Booking.js'
import { NewsletterSubscriber } from '../models/NewsletterSubscriber.js'

export async function track(req: AuthRequest, res: Response) {
  const { path, visitorId } = req.body as {
    path: string
    visitorId?: string
    isUnique?: boolean
  }
  const isUnique = Boolean(req.body.isUnique)
  await trackVisit({ path: path || '/', visitorId, isUnique })
  sendSuccess(res, { ok: true })
}

export async function adminAnalytics(_req: AuthRequest, res: Response) {
  const days = Number(_req.query.days) || 30
  sendSuccess(res, await getAnalyticsSummary(days))
}

export async function dashboard(_req: AuthRequest, res: Response) {
  const [leads, bookings, blogs, subscribers, analytics] = await Promise.all([
    Lead.countDocuments(),
    Booking.countDocuments({ status: 'pending' }),
    Blog.countDocuments({ status: 'published' }),
    NewsletterSubscriber.countDocuments({ isActive: true }),
    getAnalyticsSummary(30),
  ])

  const recentLeads = await Lead.find().sort({ createdAt: -1 }).limit(5)
  const recentBookings = await Booking.find().sort({ createdAt: -1 }).limit(5)

  sendSuccess(res, {
    cards: {
      totalVisitors: analytics.totals.totalVisits,
      uniqueVisitors: analytics.totals.uniqueVisitors,
      leads,
      bookings: await Booking.countDocuments(),
      pendingBookings: bookings,
      blogPosts: blogs,
      subscribers,
      pageViews: analytics.totals.pageViews,
      leadConversions: analytics.totals.leadConversions,
      bookingConversions: analytics.totals.bookingConversions,
    },
    charts: {
      visitors: analytics.daily.map((d) => ({
        date: d.date,
        visits: d.totalVisits,
        unique: d.uniqueVisitors,
      })),
      conversions: analytics.daily.map((d) => ({
        date: d.date,
        leads: d.leadConversions,
        bookings: d.bookingConversions,
      })),
    },
    recentActivity: {
      leads: recentLeads,
      bookings: recentBookings,
    },
  })
}
