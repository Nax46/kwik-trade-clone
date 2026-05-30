import { z } from 'zod'

export const contactSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .refine(
      (value) => value.replace(/\D/g, '').length >= 10,
      'Enter a valid phone number',
    ),
  subject: z
    .string()
    .min(1, 'Subject is required')
    .min(3, 'Subject must be at least 3 characters'),
  message: z
    .string()
    .min(1, 'Message is required')
    .min(10, 'Message must be at least 10 characters'),
})

export type ContactFormValues = z.infer<typeof contactSchema>
