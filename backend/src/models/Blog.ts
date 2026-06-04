import mongoose, { type Document, Schema } from 'mongoose'

export const BLOG_CATEGORIES = [
  'Trading Basics',
  'Technical Analysis',
  'Risk Management',
  'Market Psychology',
  'Market Updates',
  'Beginner Guides',
] as const

export type BlogCategory = (typeof BLOG_CATEGORIES)[number]
export type BlogStatus = 'draft' | 'published'

export interface IBlog extends Document {
  title: string
  slug: string
  excerpt: string
  content: string
  thumbnail?: string
  category: BlogCategory
  tags: string[]
  seoTitle?: string
  seoDescription?: string
  author: string
  status: BlogStatus
  publishedAt?: Date
}

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    thumbnail: { type: String },
    category: { type: String, enum: BLOG_CATEGORIES, required: true },
    tags: [{ type: String, trim: true }],
    seoTitle: { type: String },
    seoDescription: { type: String },
    author: { type: String, required: true, default: 'Manish' },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    publishedAt: { type: Date },
  },
  { timestamps: true },
)

blogSchema.index({ status: 1, publishedAt: -1 })
blogSchema.index({ category: 1 })

export const Blog = mongoose.model<IBlog>('Blog', blogSchema)
