import { COMPANY, faqItems, services, teamMembers, testimonials } from '../../data/siteContent'
import type {
  ActivityItem,
  AdminService,
  ContactRequest,
  DashboardStats,
  FaqItem,
  Lead,
  TeamMember,
  Testimonial,
  WebsiteSettings,
} from '../types'

const STORAGE_KEY = 'meridian_admin_db_v1'

type Database = {
  leads: Lead[]
  contacts: ContactRequest[]
  testimonials: Testimonial[]
  team: TeamMember[]
  services: AdminService[]
  faqs: FaqItem[]
  settings: WebsiteSettings
  activities: ActivityItem[]
  stats: DashboardStats
}

const now = () => new Date().toISOString()
const id = () => crypto.randomUUID()

function seedLeads(): Lead[] {
  return [
    {
      id: id(),
      name: 'Robert Hayes',
      email: 'robert.hayes@northline.io',
      phone: '+1 415 555 0142',
      company: 'Northline Technologies',
      source: 'Website',
      status: 'new',
      notes: 'Interested in corporate advisory for Series B.',
      createdAt: '2026-06-01T10:30:00Z',
      updatedAt: '2026-06-01T10:30:00Z',
    },
    {
      id: id(),
      name: 'Amelia Foster',
      email: 'amelia@harborlogistics.com',
      phone: '+1 212 555 0198',
      company: 'Harbor Logistics',
      source: 'Referral',
      status: 'contacted',
      notes: 'Follow-up scheduled for wealth management overview.',
      createdAt: '2026-05-28T14:15:00Z',
      updatedAt: '2026-05-30T09:00:00Z',
    },
    {
      id: id(),
      name: 'David Kim',
      email: 'david.kim@familyoffice.co',
      phone: '+1 650 555 0177',
      company: 'Kim Family Office',
      source: 'Conference',
      status: 'qualified',
      notes: 'Requested portfolio review and estate coordination.',
      createdAt: '2026-05-22T08:45:00Z',
      updatedAt: '2026-05-27T16:20:00Z',
    },
    {
      id: id(),
      name: 'Lisa Montoya',
      email: 'lisa.m@greenfield.cap',
      phone: '+1 303 555 0133',
      company: 'Greenfield Capital',
      source: 'LinkedIn',
      status: 'converted',
      notes: 'Signed wealth management engagement.',
      createdAt: '2026-05-10T11:00:00Z',
      updatedAt: '2026-05-18T13:45:00Z',
    },
    {
      id: id(),
      name: 'Thomas Wright',
      email: 'twright@startup.io',
      phone: '+1 512 555 0166',
      company: 'Apex Startup Studio',
      source: 'Website',
      status: 'lost',
      notes: 'Budget constraints — may revisit Q4.',
      createdAt: '2026-04-15T09:30:00Z',
      updatedAt: '2026-04-22T10:00:00Z',
    },
  ]
}

function seedContacts(): ContactRequest[] {
  return [
    {
      id: id(),
      fullName: 'Jennifer Walsh',
      email: 'j.walsh@email.com',
      phone: '+1 617 555 0101',
      subject: 'Wealth management consultation',
      message: 'Looking to discuss portfolio strategy for retirement within 10 years.',
      status: 'new',
      createdAt: '2026-06-02T15:20:00Z',
      updatedAt: '2026-06-02T15:20:00Z',
    },
    {
      id: id(),
      fullName: 'Michael Chen',
      email: 'mchen@corp.com',
      phone: '+1 408 555 0122',
      subject: 'M&A advisory inquiry',
      message: 'We are exploring acquisition targets in the healthcare sector.',
      status: 'in_progress',
      createdAt: '2026-06-01T09:10:00Z',
      updatedAt: '2026-06-02T11:30:00Z',
    },
    {
      id: id(),
      fullName: 'Sarah Bennett',
      email: 'sbennett@family.com',
      phone: '+1 212 555 0188',
      subject: 'General inquiry',
      message: 'Please call me to discuss trust and estate planning options.',
      status: 'resolved',
      createdAt: '2026-05-25T13:00:00Z',
      updatedAt: '2026-05-28T10:15:00Z',
    },
  ]
}

function seedTestimonials(): Testimonial[] {
  return testimonials.map((t) => ({
    id: id(),
    quote: t.quote,
    name: t.name,
    role: t.role,
    published: true,
    createdAt: now(),
    updatedAt: now(),
  }))
}

function seedTeam(): TeamMember[] {
  return teamMembers.map((m) => ({
    id: id(),
    name: m.name,
    role: m.role,
    bio: m.bio,
    image: m.image,
    published: true,
    createdAt: now(),
    updatedAt: now(),
  }))
}

function seedServices(): AdminService[] {
  return services.map((s, index) => ({
    id: s.id,
    title: s.title,
    summary: s.summary,
    description: s.description,
    features: [...s.features],
    active: true,
    sortOrder: index + 1,
    createdAt: now(),
    updatedAt: now(),
  }))
}

function seedFaqs(): FaqItem[] {
  return faqItems.map((f, index) => ({
    id: f.id,
    question: f.question,
    answer: f.answer,
    published: true,
    sortOrder: index + 1,
    createdAt: now(),
    updatedAt: now(),
  }))
}

function seedSettings(): WebsiteSettings {
  return {
    companyName: COMPANY.name,
    shortName: COMPANY.shortName,
    tagline: COMPANY.tagline,
    description: COMPANY.description,
    email: COMPANY.email,
    phone: COMPANY.phone,
    address: COMPANY.address,
    hours: COMPANY.hours,
    metaTitle: `${COMPANY.name} — Financial Services`,
    metaDescription: COMPANY.description,
  }
}

function seedActivities(): ActivityItem[] {
  return [
    {
      id: id(),
      type: 'lead',
      message: 'New lead submitted: Robert Hayes (Northline Technologies)',
      createdAt: '2026-06-02T16:00:00Z',
    },
    {
      id: id(),
      type: 'contact',
      message: 'Contact request received from Jennifer Walsh',
      createdAt: '2026-06-02T15:20:00Z',
    },
    {
      id: id(),
      type: 'service',
      message: 'Service "Wealth Management" was updated',
      createdAt: '2026-06-01T11:45:00Z',
    },
    {
      id: id(),
      type: 'testimonial',
      message: 'Testimonial from James Okonkwo published',
      createdAt: '2026-05-30T14:30:00Z',
    },
    {
      id: id(),
      type: 'faq',
      message: 'FAQ item "How do I get started?" was edited',
      createdAt: '2026-05-29T09:15:00Z',
    },
    {
      id: id(),
      type: 'settings',
      message: 'Website settings updated by admin',
      createdAt: '2026-05-28T17:00:00Z',
    },
  ]
}

function createSeedDatabase(): Database {
  return {
    leads: seedLeads(),
    contacts: seedContacts(),
    testimonials: seedTestimonials(),
    team: seedTeam(),
    services: seedServices(),
    faqs: seedFaqs(),
    settings: seedSettings(),
    activities: seedActivities(),
    stats: {
      totalVisitors: 24850,
      contactRequests: 127,
      newLeads: 34,
      visitorChangePercent: 12.4,
      contactChangePercent: 8.2,
      leadsChangePercent: -3.1,
    },
  }
}

export function loadDatabase(): Database {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      return JSON.parse(raw) as Database
    }
  } catch {
    /* use seed */
  }
  const seed = createSeedDatabase()
  saveDatabase(seed)
  return seed
}

export function saveDatabase(db: Database): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db))
}

export function resetDatabase(): Database {
  const seed = createSeedDatabase()
  saveDatabase(seed)
  return seed
}

export { id, now, type Database }
