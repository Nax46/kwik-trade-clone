import type { Response } from 'express'
import type { AuthRequest } from '../middleware/auth.js'
import { Blog } from '../models/Blog.js'
import { ApiError } from '../utils/ApiError.js'
import { slugify } from '../utils/slugify.js'
import { sendSuccess } from '../utils/response.js'

function applyPublishFields(body: Record<string, unknown>) {
  if (body.status === 'published' && !body.publishedAt) {
    body.publishedAt = new Date()
  }
}

export async function listBlogs(req: AuthRequest, res: Response) {
  const { page, limit, status, category, q } = req.query as unknown as {
    page: number
    limit: number
    status?: string
    category?: string
    q?: string
  }
  const filter: Record<string, unknown> = {}
  if (status) filter.status = status
  if (category) filter.category = category
  if (q) {
    filter.$or = [
      { title: { $regex: q, $options: 'i' } },
      { excerpt: { $regex: q, $options: 'i' } },
    ]
  }
  const skip = (page - 1) * limit
  const [items, total] = await Promise.all([
    Blog.find(filter).sort({ publishedAt: -1, createdAt: -1 }).skip(skip).limit(limit),
    Blog.countDocuments(filter),
  ])
  sendSuccess(res, { items, total, page, limit })
}

export async function getBlogBySlug(req: AuthRequest, res: Response) {
  const blog = await Blog.findOne({ slug: req.params.slug, status: 'published' })
  if (!blog) throw new ApiError(404, 'Blog not found')
  sendSuccess(res, blog)
}

export async function getBlogBySlugAdmin(req: AuthRequest, res: Response) {
  const blog = await Blog.findOne({ slug: req.params.slug })
  if (!blog) throw new ApiError(404, 'Blog not found')
  sendSuccess(res, blog)
}

export async function createBlog(req: AuthRequest, res: Response) {
  const body = { ...req.body } as Record<string, unknown>
  if (!body.slug) body.slug = slugify(String(body.title))
  applyPublishFields(body)
  const blog = await Blog.create(body)
  sendSuccess(res, blog, 201)
}

export async function updateBlog(req: AuthRequest, res: Response) {
  const body = { ...req.body } as Record<string, unknown>
  applyPublishFields(body)
  const blog = await Blog.findByIdAndUpdate(req.params.id, body, {
    new: true,
    runValidators: true,
  })
  if (!blog) throw new ApiError(404, 'Blog not found')
  sendSuccess(res, blog)
}

export async function deleteBlog(req: AuthRequest, res: Response) {
  const blog = await Blog.findByIdAndDelete(req.params.id)
  if (!blog) throw new ApiError(404, 'Blog not found')
  sendSuccess(res, null, 200, 'Blog deleted')
}
