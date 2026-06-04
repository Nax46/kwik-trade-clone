import { z } from 'zod'

export const createLeadSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().min(10).max(15),
  email: z.string().email(),
  experienceLevel: z.string().optional(),
  interestedService: z.string().optional(),
  message: z.string().max(2000).optional(),
  source: z.enum(['contact', 'consultation', 'newsletter', 'registration']).default('contact'),
})

export const updateLeadSchema = z.object({
  status: z.enum(['new', 'contacted', 'qualified', 'closed']).optional(),
  note: z.string().min(1).max(1000).optional(),
})

export const listLeadsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  status: z.enum(['new', 'contacted', 'qualified', 'closed']).optional(),
  q: z.string().optional(),
})
