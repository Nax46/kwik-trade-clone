import type { Response } from 'express'
import type { AuthRequest } from '../middleware/auth.js'
import { Lead } from '../models/Lead.js'
import { notifyAdminNewLead } from '../services/email.service.js'
import { trackLeadConversion } from '../services/analytics.service.js'
import { ApiError } from '../utils/ApiError.js'
import { sendSuccess } from '../utils/response.js'

export async function createLead(req: AuthRequest, res: Response) {
  const body = {
    ...req.body,
    email: String(req.body.email).toLowerCase().trim(),
    phone: String(req.body.phone).trim(),
  }
  const lead = await Lead.create(body)
  await trackLeadConversion()
  await notifyAdminNewLead({
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    source: lead.source,
  })
  sendSuccess(res, { id: lead._id }, 201, 'Thank you! We will contact you soon.')
}

export async function listLeads(req: AuthRequest, res: Response) {
  const { page, limit, status, q } = req.query as unknown as {
    page: number
    limit: number
    status?: string
    q?: string
  }
  const filter: Record<string, unknown> = {}
  if (status) filter.status = status
  if (q) {
    filter.$or = [
      { name: { $regex: q, $options: 'i' } },
      { email: { $regex: q, $options: 'i' } },
      { phone: { $regex: q, $options: 'i' } },
    ]
  }
  const skip = (page - 1) * limit
  const [items, total] = await Promise.all([
    Lead.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Lead.countDocuments(filter),
  ])
  sendSuccess(res, { items, total, page, limit, pages: Math.ceil(total / limit) })
}

export async function updateLead(req: AuthRequest, res: Response) {
  const lead = await Lead.findById(req.params.id)
  if (!lead) throw new ApiError(404, 'Lead not found')

  const body = req.body as { status?: string; note?: string }
  if (body.status) lead.status = body.status as typeof lead.status
  if (body.note) {
    lead.notes.push({
      text: body.note,
      createdAt: new Date(),
      authorId: req.user?._id,
    })
  }
  await lead.save()
  sendSuccess(res, lead)
}

export async function deleteLead(req: AuthRequest, res: Response) {
  const lead = await Lead.findByIdAndDelete(req.params.id)
  if (!lead) throw new ApiError(404, 'Lead not found')
  sendSuccess(res, null, 200, 'Lead deleted')
}
