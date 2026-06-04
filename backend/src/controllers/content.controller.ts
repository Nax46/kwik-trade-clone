import type { Response } from 'express'
import type { AuthRequest } from '../middleware/auth.js'
import { Resource } from '../models/Resource.js'
import { Testimonial } from '../models/Testimonial.js'
import { NewsletterSubscriber } from '../models/NewsletterSubscriber.js'
import { Settings, ensureDefaultSettings } from '../models/Settings.js'
import { ApiError } from '../utils/ApiError.js'
import { sendSuccess } from '../utils/response.js'

export async function getPublicSettings(_req: AuthRequest, res: Response) {
  const settings = await ensureDefaultSettings()
  sendSuccess(res, settings)
}

export async function updateSettings(req: AuthRequest, res: Response) {
  const settings = await Settings.findOneAndUpdate({ key: 'site' }, req.body, {
    new: true,
    upsert: true,
  })
  sendSuccess(res, settings)
}

export async function listResources(req: AuthRequest, res: Response) {
  const activeOnly = req.path.includes('/admin') ? false : true
  const filter = activeOnly ? { isActive: true } : {}
  const items = await Resource.find(filter).sort({ createdAt: -1 })
  sendSuccess(res, items)
}

export async function createResource(req: AuthRequest, res: Response) {
  const doc = await Resource.create(req.body)
  sendSuccess(res, doc, 201)
}

export async function updateResource(req: AuthRequest, res: Response) {
  const doc = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!doc) throw new ApiError(404, 'Resource not found')
  sendSuccess(res, doc)
}

export async function deleteResource(req: AuthRequest, res: Response) {
  await Resource.findByIdAndDelete(req.params.id)
  sendSuccess(res, null, 200, 'Deleted')
}

export async function listTestimonials(req: AuthRequest, res: Response) {
  const publishedOnly = !req.path.includes('/admin')
  const filter = publishedOnly ? { isPublished: true } : {}
  const items = await Testimonial.find(filter).sort({ order: 1, createdAt: -1 })
  sendSuccess(res, items)
}

export async function createTestimonial(req: AuthRequest, res: Response) {
  sendSuccess(res, await Testimonial.create(req.body), 201)
}

export async function updateTestimonial(req: AuthRequest, res: Response) {
  const doc = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!doc) throw new ApiError(404, 'Not found')
  sendSuccess(res, doc)
}

export async function deleteTestimonial(req: AuthRequest, res: Response) {
  await Testimonial.findByIdAndDelete(req.params.id)
  sendSuccess(res, null, 200, 'Deleted')
}

export async function subscribeNewsletter(req: AuthRequest, res: Response) {
  const email = String((req.body as { email: string }).email).toLowerCase().trim()
  const existing = await NewsletterSubscriber.findOne({ email })
  if (existing) {
    existing.isActive = true
    existing.unsubscribedAt = undefined
    existing.subscribedAt = new Date()
    await existing.save()
    sendSuccess(res, null, 200, 'Subscribed successfully')
    return
  }
  await NewsletterSubscriber.create({ email })
  sendSuccess(res, null, 201, 'Subscribed successfully')
}

export async function unsubscribeNewsletter(req: AuthRequest, res: Response) {
  const { email } = req.body as { email: string }
  const sub = await NewsletterSubscriber.findOne({ email })
  if (sub) {
    sub.isActive = false
    sub.unsubscribedAt = new Date()
    await sub.save()
  }
  sendSuccess(res, null, 200, 'Unsubscribed')
}

export async function listNewsletter(req: AuthRequest, res: Response) {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 20
  const skip = (page - 1) * limit
  const filter = req.query.active === 'true' ? { isActive: true } : {}
  const [items, total] = await Promise.all([
    NewsletterSubscriber.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    NewsletterSubscriber.countDocuments(filter),
  ])
  sendSuccess(res, { items, total, page, limit })
}
