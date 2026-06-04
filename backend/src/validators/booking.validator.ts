import { z } from 'zod'

export const createBookingSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email(),
  experienceLevel: z.string().optional(),
  interestedService: z.string().optional(),
  message: z.string().max(2000).optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeSlot: z.string().min(4),
})

export const updateBookingSchema = z.object({
  status: z.enum(['pending', 'approved', 'rejected', 'completed']).optional(),
  adminNotes: z.string().max(2000).optional(),
})

export const availabilityQuerySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
})
