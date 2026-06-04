import type { Response } from 'express'
import type { AuthRequest } from '../middleware/auth.js'
import { Booking } from '../models/Booking.js'
import { Lead } from '../models/Lead.js'
import { getAvailableSlots } from '../services/booking.service.js'
import { notifyAdminNewBooking } from '../services/email.service.js'
import { trackBookingConversion, trackLeadConversion } from '../services/analytics.service.js'
import { ApiError } from '../utils/ApiError.js'
import { sendSuccess } from '../utils/response.js'

export async function getAvailability(req: AuthRequest, res: Response) {
  const { date } = req.query as { date: string }
  const slots = await getAvailableSlots(date)
  sendSuccess(res, { date, slots })
}

export async function createBooking(req: AuthRequest, res: Response) {
  const available = await getAvailableSlots(req.body.date)
  if (!available.includes(req.body.timeSlot)) {
    throw new ApiError(409, 'Selected time slot is no longer available')
  }
  const booking = await Booking.create(req.body)
  await Lead.create({
    ...req.body,
    source: 'consultation',
    status: 'new',
  })
  await trackBookingConversion()
  await trackLeadConversion()
  await notifyAdminNewBooking({
    name: booking.name,
    email: booking.email,
    date: booking.date,
    timeSlot: booking.timeSlot,
  })
  sendSuccess(res, { id: booking._id }, 201, 'Consultation booked successfully')
}

export async function listBookings(req: AuthRequest, res: Response) {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const status = req.query.status as string | undefined
  const filter = status ? { status } : {}
  const skip = (page - 1) * limit
  const [items, total] = await Promise.all([
    Booking.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Booking.countDocuments(filter),
  ])
  sendSuccess(res, { items, total, page, limit, pages: Math.ceil(total / limit) || 1 })
}

export async function updateBooking(req: AuthRequest, res: Response) {
  const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!booking) throw new ApiError(404, 'Booking not found')
  sendSuccess(res, booking)
}
