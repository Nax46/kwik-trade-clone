export type EntityStatus = 'new' | 'in_progress' | 'resolved' | 'archived'

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'

export type Lead = {
  id: string
  name: string
  email: string
  phone: string
  company: string
  source: string
  status: LeadStatus
  notes: string
  createdAt: string
  updatedAt: string
}

export type ContactRequest = {
  id: string
  fullName: string
  email: string
  phone: string
  subject: string
  message: string
  status: EntityStatus
  createdAt: string
  updatedAt: string
}

export type Testimonial = {
  id: string
  quote: string
  name: string
  role: string
  published: boolean
  createdAt: string
  updatedAt: string
}

export type TeamMember = {
  id: string
  name: string
  role: string
  bio: string
  image: string
  published: boolean
  createdAt: string
  updatedAt: string
}

export type AdminService = {
  id: string
  title: string
  summary: string
  description: string
  features: string[]
  active: boolean
  sortOrder: number
  createdAt: string
  updatedAt: string
}

export type FaqItem = {
  id: string
  question: string
  answer: string
  published: boolean
  sortOrder: number
  createdAt: string
  updatedAt: string
}

export type WebsiteSettings = {
  companyName: string
  shortName: string
  tagline: string
  description: string
  email: string
  phone: string
  address: string
  hours: string
  metaTitle: string
  metaDescription: string
}

export type ActivityItem = {
  id: string
  type: 'lead' | 'contact' | 'testimonial' | 'team' | 'service' | 'faq' | 'settings'
  message: string
  createdAt: string
}

export type DashboardStats = {
  totalVisitors: number
  contactRequests: number
  newLeads: number
  visitorChangePercent: number
  contactChangePercent: number
  leadsChangePercent: number
}

export type PaginatedResult<T> = {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export type ListParams = {
  page?: number
  pageSize?: number
  search?: string
  status?: string
  published?: boolean
  sortBy?: string
  sortDir?: 'asc' | 'desc'
}

export type ApiResponse<T> = {
  success: boolean
  data: T
  message?: string
}
