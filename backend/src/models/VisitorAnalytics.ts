import mongoose, { type Document, Schema } from 'mongoose'

export interface IPageStat {
  path: string
  views: number
}

export interface IVisitorAnalytics extends Document {
  date: string
  totalVisits: number
  uniqueVisitors: number
  pageViews: number
  leadConversions: number
  bookingConversions: number
  pages: IPageStat[]
}

const visitorAnalyticsSchema = new Schema<IVisitorAnalytics>(
  {
    date: { type: String, required: true, unique: true },
    totalVisits: { type: Number, default: 0 },
    uniqueVisitors: { type: Number, default: 0 },
    pageViews: { type: Number, default: 0 },
    leadConversions: { type: Number, default: 0 },
    bookingConversions: { type: Number, default: 0 },
    pages: [{ path: String, views: Number }],
  },
  { timestamps: true },
)

export const VisitorAnalytics = mongoose.model<IVisitorAnalytics>(
  'VisitorAnalytics',
  visitorAnalyticsSchema,
)
