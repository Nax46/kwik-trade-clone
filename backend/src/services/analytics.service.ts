import { VisitorAnalytics } from '../models/VisitorAnalytics.js'

function todayKey(): string {
  return new Date().toISOString().slice(0, 10)
}

export async function trackVisit(payload: {
  path: string
  visitorId?: string
  isUnique?: boolean
}): Promise<void> {
  const date = todayKey()
  const inc: Record<string, number> = {
    totalVisits: 1,
    pageViews: 1,
  }
  if (payload.isUnique) inc.uniqueVisitors = 1

  await VisitorAnalytics.findOneAndUpdate(
    { date },
    {
      $inc: inc,
      $setOnInsert: { date },
    },
    { upsert: true, new: true },
  )

  await VisitorAnalytics.updateOne(
    { date, 'pages.path': payload.path },
    { $inc: { 'pages.$.views': 1 } },
  )

  const updated = await VisitorAnalytics.findOne({ date })
  const hasPage = updated?.pages.some((p) => p.path === payload.path)
  if (!hasPage) {
    await VisitorAnalytics.updateOne(
      { date },
      { $push: { pages: { path: payload.path, views: 1 } } },
    )
  }
}

export async function trackLeadConversion(): Promise<void> {
  const date = todayKey()
  await VisitorAnalytics.findOneAndUpdate(
    { date },
    { $inc: { leadConversions: 1 }, $setOnInsert: { date } },
    { upsert: true },
  )
}

export async function trackBookingConversion(): Promise<void> {
  const date = todayKey()
  await VisitorAnalytics.findOneAndUpdate(
    { date },
    { $inc: { bookingConversions: 1 }, $setOnInsert: { date } },
    { upsert: true },
  )
}

export async function getAnalyticsSummary(days = 30) {
  const since = new Date()
  since.setDate(since.getDate() - days)
  const sinceKey = since.toISOString().slice(0, 10)

  const rows = await VisitorAnalytics.find({ date: { $gte: sinceKey } }).sort({ date: 1 })

  const totals = rows.reduce(
    (acc, r) => ({
      totalVisits: acc.totalVisits + r.totalVisits,
      uniqueVisitors: acc.uniqueVisitors + r.uniqueVisitors,
      pageViews: acc.pageViews + r.pageViews,
      leadConversions: acc.leadConversions + r.leadConversions,
      bookingConversions: acc.bookingConversions + r.bookingConversions,
    }),
    {
      totalVisits: 0,
      uniqueVisitors: 0,
      pageViews: 0,
      leadConversions: 0,
      bookingConversions: 0,
    },
  )

  return { totals, daily: rows }
}
