import type { Response } from 'express'
import type { AuthRequest } from '../middleware/auth.js'
import { Insight } from '../models/Insight.js'
import { ApiError } from '../utils/ApiError.js'
import { slugify } from '../utils/slugify.js'
import { sendSuccess } from '../utils/response.js'

export async function listInsights(req: AuthRequest, res: Response) {
  const status = (req.query.status as string) || 'published'
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const filter: Record<string, unknown> = {}
  if (status !== 'all') filter.status = status
  const skip = (page - 1) * limit
  const [items, total] = await Promise.all([
    Insight.find(filter).sort({ publishedAt: -1 }).skip(skip).limit(limit),
    Insight.countDocuments(filter),
  ])
  sendSuccess(res, { items, total, page, limit })
}

export async function getInsightBySlug(req: AuthRequest, res: Response) {
  const insight = await Insight.findOne({ slug: req.params.slug, status: 'published' })
  if (!insight) throw new ApiError(404, 'Insight not found')
  sendSuccess(res, insight)
}

export async function createInsight(req: AuthRequest, res: Response) {
  const body = { ...req.body } as Record<string, unknown>
  if (!body.slug) body.slug = slugify(String(body.title))
  if (body.status === 'published' && !body.publishedAt) body.publishedAt = new Date()
  const doc = await Insight.create(body)
  sendSuccess(res, doc, 201)
}

export async function updateInsight(req: AuthRequest, res: Response) {
  const doc = await Insight.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!doc) throw new ApiError(404, 'Insight not found')
  sendSuccess(res, doc)
}

export async function deleteInsight(req: AuthRequest, res: Response) {
  const doc = await Insight.findByIdAndDelete(req.params.id)
  if (!doc) throw new ApiError(404, 'Insight not found')
  sendSuccess(res, null, 200, 'Deleted')
}
