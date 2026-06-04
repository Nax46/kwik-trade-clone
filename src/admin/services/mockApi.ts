import type {
  ActivityItem,
  AdminService,
  ApiResponse,
  ContactRequest,
  DashboardStats,
  FaqItem,
  Lead,
  ListParams,
  PaginatedResult,
  TeamMember,
  Testimonial,
  WebsiteSettings,
} from '../types'
import { id, loadDatabase, now, saveDatabase, type Database } from './mockDb'

const API_DELAY_MS = 350

function delay(ms = API_DELAY_MS) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function paginate<T>(
  items: T[],
  { page = 1, pageSize = 10, search = '', filterFn }: ListParams & { filterFn?: (item: T) => boolean },
): PaginatedResult<T> {
  let filtered = items

  if (filterFn) {
    filtered = filtered.filter(filterFn)
  }

  if (search.trim()) {
    const q = search.toLowerCase()
    filtered = filtered.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(q),
    )
  }

  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(Math.max(1, page), totalPages)
  const start = (safePage - 1) * pageSize

  return {
    data: filtered.slice(start, start + pageSize),
    total,
    page: safePage,
    pageSize,
    totalPages,
  }
}

function withDb<T>(fn: (db: Database) => T): T {
  const db = loadDatabase()
  const result = fn(db)
  saveDatabase(db)
  return result
}

function logActivity(
  db: Database,
  type: ActivityItem['type'],
  message: string,
): void {
  db.activities.unshift({
    id: id(),
    type,
    message,
    createdAt: now(),
  })
  db.activities = db.activities.slice(0, 50)
}

export const mockApi = {
  async getDashboard(): Promise<ApiResponse<{ stats: DashboardStats; activities: ActivityItem[] }>> {
    await delay()
    const db = loadDatabase()
    return {
      success: true,
      data: {
        stats: { ...db.stats },
        activities: db.activities.slice(0, 8),
      },
    }
  },

  async listLeads(params: ListParams = {}): Promise<ApiResponse<PaginatedResult<Lead>>> {
    await delay()
    const db = loadDatabase()
    const result = paginate(db.leads, {
      ...params,
      filterFn: params.status ? (l) => l.status === params.status : undefined,
    })
    return { success: true, data: result }
  },

  async createLead(payload: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Lead>> {
    await delay()
    return withDb((db) => {
      const lead: Lead = {
        ...payload,
        id: id(),
        createdAt: now(),
        updatedAt: now(),
      }
      db.leads.unshift(lead)
      db.stats.newLeads += 1
      logActivity(db, 'lead', `New lead created: ${lead.name}`)
      return { success: true, data: lead }
    })
  },

  async updateLead(leadId: string, payload: Partial<Lead>): Promise<ApiResponse<Lead>> {
    await delay()
    return withDb((db) => {
      const index = db.leads.findIndex((l) => l.id === leadId)
      if (index === -1) throw new Error('Lead not found')
      db.leads[index] = { ...db.leads[index], ...payload, updatedAt: now() }
      logActivity(db, 'lead', `Lead updated: ${db.leads[index].name}`)
      return { success: true, data: db.leads[index] }
    })
  },

  async deleteLead(leadId: string): Promise<ApiResponse<null>> {
    await delay()
    withDb((db) => {
      const lead = db.leads.find((l) => l.id === leadId)
      db.leads = db.leads.filter((l) => l.id !== leadId)
      if (lead) logActivity(db, 'lead', `Lead deleted: ${lead.name}`)
      return null
    })
    return { success: true, data: null, message: 'Lead deleted' }
  },

  async listContacts(params: ListParams = {}): Promise<ApiResponse<PaginatedResult<ContactRequest>>> {
    await delay()
    const db = loadDatabase()
    const result = paginate(db.contacts, {
      ...params,
      filterFn: params.status ? (c) => c.status === params.status : undefined,
    })
    return { success: true, data: result }
  },

  async createContact(
    payload: Omit<ContactRequest, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ApiResponse<ContactRequest>> {
    await delay()
    return withDb((db) => {
      const contact: ContactRequest = {
        ...payload,
        id: id(),
        createdAt: now(),
        updatedAt: now(),
      }
      db.contacts.unshift(contact)
      db.stats.contactRequests += 1
      logActivity(db, 'contact', `Contact request: ${contact.fullName}`)
      return { success: true, data: contact }
    })
  },

  async updateContact(
    contactId: string,
    payload: Partial<ContactRequest>,
  ): Promise<ApiResponse<ContactRequest>> {
    await delay()
    return withDb((db) => {
      const index = db.contacts.findIndex((c) => c.id === contactId)
      if (index === -1) throw new Error('Contact not found')
      db.contacts[index] = { ...db.contacts[index], ...payload, updatedAt: now() }
      logActivity(db, 'contact', `Contact updated: ${db.contacts[index].fullName}`)
      return { success: true, data: db.contacts[index] }
    })
  },

  async deleteContact(contactId: string): Promise<ApiResponse<null>> {
    await delay()
    withDb((db) => {
      const item = db.contacts.find((c) => c.id === contactId)
      db.contacts = db.contacts.filter((c) => c.id !== contactId)
      if (item) logActivity(db, 'contact', `Contact deleted: ${item.fullName}`)
      return null
    })
    return { success: true, data: null }
  },

  async listTestimonials(params: ListParams = {}): Promise<ApiResponse<PaginatedResult<Testimonial>>> {
    await delay()
    const db = loadDatabase()
    const result = paginate(db.testimonials, {
      ...params,
      filterFn:
        params.published !== undefined
          ? (t) => t.published === params.published
          : undefined,
    })
    return { success: true, data: result }
  },

  async createTestimonial(
    payload: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ApiResponse<Testimonial>> {
    await delay()
    return withDb((db) => {
      const item: Testimonial = { ...payload, id: id(), createdAt: now(), updatedAt: now() }
      db.testimonials.unshift(item)
      logActivity(db, 'testimonial', `Testimonial added: ${item.name}`)
      return { success: true, data: item }
    })
  },

  async updateTestimonial(
    itemId: string,
    payload: Partial<Testimonial>,
  ): Promise<ApiResponse<Testimonial>> {
    await delay()
    return withDb((db) => {
      const index = db.testimonials.findIndex((t) => t.id === itemId)
      if (index === -1) throw new Error('Not found')
      db.testimonials[index] = { ...db.testimonials[index], ...payload, updatedAt: now() }
      logActivity(db, 'testimonial', `Testimonial updated: ${db.testimonials[index].name}`)
      return { success: true, data: db.testimonials[index] }
    })
  },

  async deleteTestimonial(itemId: string): Promise<ApiResponse<null>> {
    await delay()
    withDb((db) => {
      const item = db.testimonials.find((t) => t.id === itemId)
      db.testimonials = db.testimonials.filter((t) => t.id !== itemId)
      if (item) logActivity(db, 'testimonial', `Testimonial deleted: ${item.name}`)
      return null
    })
    return { success: true, data: null }
  },

  async listTeam(params: ListParams = {}): Promise<ApiResponse<PaginatedResult<TeamMember>>> {
    await delay()
    const db = loadDatabase()
    const result = paginate(db.team, {
      ...params,
      filterFn:
        params.published !== undefined ? (t) => t.published === params.published : undefined,
    })
    return { success: true, data: result }
  },

  async createTeamMember(
    payload: Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ApiResponse<TeamMember>> {
    await delay()
    return withDb((db) => {
      const item: TeamMember = { ...payload, id: id(), createdAt: now(), updatedAt: now() }
      db.team.unshift(item)
      logActivity(db, 'team', `Team member added: ${item.name}`)
      return { success: true, data: item }
    })
  },

  async updateTeamMember(
    itemId: string,
    payload: Partial<TeamMember>,
  ): Promise<ApiResponse<TeamMember>> {
    await delay()
    return withDb((db) => {
      const index = db.team.findIndex((t) => t.id === itemId)
      if (index === -1) throw new Error('Not found')
      db.team[index] = { ...db.team[index], ...payload, updatedAt: now() }
      logActivity(db, 'team', `Team member updated: ${db.team[index].name}`)
      return { success: true, data: db.team[index] }
    })
  },

  async deleteTeamMember(itemId: string): Promise<ApiResponse<null>> {
    await delay()
    withDb((db) => {
      const item = db.team.find((t) => t.id === itemId)
      db.team = db.team.filter((t) => t.id !== itemId)
      if (item) logActivity(db, 'team', `Team member deleted: ${item.name}`)
      return null
    })
    return { success: true, data: null }
  },

  async listServices(params: ListParams = {}): Promise<ApiResponse<PaginatedResult<AdminService>>> {
    await delay()
    const db = loadDatabase()
    const result = paginate(
      [...db.services].sort((a, b) => a.sortOrder - b.sortOrder),
      {
        ...params,
        filterFn:
          params.status === 'active'
            ? (s) => s.active
            : params.status === 'inactive'
              ? (s) => !s.active
              : undefined,
      },
    )
    return { success: true, data: result }
  },

  async createService(
    payload: Omit<AdminService, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ApiResponse<AdminService>> {
    await delay()
    return withDb((db) => {
      const item: AdminService = {
        ...payload,
        id: id(),
        createdAt: now(),
        updatedAt: now(),
      }
      db.services.push(item)
      logActivity(db, 'service', `Service created: ${item.title}`)
      return { success: true, data: item }
    })
  },

  async updateService(
    itemId: string,
    payload: Partial<AdminService>,
  ): Promise<ApiResponse<AdminService>> {
    await delay()
    return withDb((db) => {
      const index = db.services.findIndex((s) => s.id === itemId)
      if (index === -1) throw new Error('Not found')
      db.services[index] = { ...db.services[index], ...payload, updatedAt: now() }
      logActivity(db, 'service', `Service updated: ${db.services[index].title}`)
      return { success: true, data: db.services[index] }
    })
  },

  async deleteService(itemId: string): Promise<ApiResponse<null>> {
    await delay()
    withDb((db) => {
      const item = db.services.find((s) => s.id === itemId)
      db.services = db.services.filter((s) => s.id !== itemId)
      if (item) logActivity(db, 'service', `Service deleted: ${item.title}`)
      return null
    })
    return { success: true, data: null }
  },

  async listFaqs(params: ListParams = {}): Promise<ApiResponse<PaginatedResult<FaqItem>>> {
    await delay()
    const db = loadDatabase()
    const result = paginate(
      [...db.faqs].sort((a, b) => a.sortOrder - b.sortOrder),
      {
        ...params,
        filterFn:
          params.published !== undefined
            ? (f) => f.published === params.published
            : undefined,
      },
    )
    return { success: true, data: result }
  },

  async createFaq(
    payload: Omit<FaqItem, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ApiResponse<FaqItem>> {
    await delay()
    return withDb((db) => {
      const item: FaqItem = { ...payload, id: id(), createdAt: now(), updatedAt: now() }
      db.faqs.push(item)
      logActivity(db, 'faq', `FAQ created: ${item.question.slice(0, 40)}…`)
      return { success: true, data: item }
    })
  },

  async updateFaq(itemId: string, payload: Partial<FaqItem>): Promise<ApiResponse<FaqItem>> {
    await delay()
    return withDb((db) => {
      const index = db.faqs.findIndex((f) => f.id === itemId)
      if (index === -1) throw new Error('Not found')
      db.faqs[index] = { ...db.faqs[index], ...payload, updatedAt: now() }
      logActivity(db, 'faq', `FAQ updated: ${db.faqs[index].question.slice(0, 40)}…`)
      return { success: true, data: db.faqs[index] }
    })
  },

  async deleteFaq(itemId: string): Promise<ApiResponse<null>> {
    await delay()
    withDb((db) => {
      const item = db.faqs.find((f) => f.id === itemId)
      db.faqs = db.faqs.filter((f) => f.id !== itemId)
      if (item) logActivity(db, 'faq', 'FAQ item deleted')
      return null
    })
    return { success: true, data: null }
  },

  async getSettings(): Promise<ApiResponse<WebsiteSettings>> {
    await delay()
    const db = loadDatabase()
    return { success: true, data: { ...db.settings } }
  },

  async updateSettings(payload: WebsiteSettings): Promise<ApiResponse<WebsiteSettings>> {
    await delay()
    return withDb((db) => {
      db.settings = { ...payload }
      logActivity(db, 'settings', 'Website settings saved')
      return { success: true, data: db.settings }
    })
  },
}
