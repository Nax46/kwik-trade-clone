import mongoose, { type Document, Schema } from 'mongoose'

export type InsightStatus = 'draft' | 'published'

export interface IInsight extends Document {
  title: string
  slug: string
  excerpt: string
  content: string
  thumbnail?: string
  market: string
  sentiment: 'bullish' | 'bearish' | 'neutral'
  status: InsightStatus
  publishedAt?: Date
  author: string
}

const insightSchema = new Schema<IInsight>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    thumbnail: { type: String },
    market: { type: String, default: 'Indian Markets' },
    sentiment: { type: String, enum: ['bullish', 'bearish', 'neutral'], default: 'neutral' },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    publishedAt: { type: Date },
    author: { type: String, default: 'Manish' },
  },
  { timestamps: true },
)

export const Insight = mongoose.model<IInsight>('Insight', insightSchema)
