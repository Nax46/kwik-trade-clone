import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Enter a valid email'),
  phone: z
    .string()
    .min(10, 'Phone is required')
    .refine((v) => v.replace(/\D/g, '').length >= 10, 'Enter a valid phone number'),
  experienceLevel: z.string().min(1, 'Select experience level'),
  interestedService: z.string().min(1, 'Select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export type ContactFormValues = z.infer<typeof contactSchema>
