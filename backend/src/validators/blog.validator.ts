import { z } from 'zod'
import { BLOG_CATEGORIES } from '../models/Blog.js'

export const blogBodySchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3).optional(),
  excerpt: z.string().min(10),
  content: z.string().min(20),
  thumbnail: z.string().url().optional().or(z.literal('')),
  category: z.enum(BLOG_CATEGORIES),
  tags: z.array(z.string()).default([]),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  author: z.string().optional(),
  status: z.enum(['draft', 'published']).optional(),
})

export const listBlogsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
  status: z.enum(['draft', 'published']).optional(),
  category: z.string().optional(),
  q: z.string().optional(),
})
