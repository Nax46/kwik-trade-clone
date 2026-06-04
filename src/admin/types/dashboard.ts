export type DashboardCards = {
  totalVisitors: number
  uniqueVisitors: number
  leads: number
  bookings: number
  blogPosts: number
  subscribers: number
}

export type DashboardLead = {
  _id: string
  name: string
  email: string
  phone: string
  status: string
  source: string
  message?: string
  experienceLevel?: string
  interestedService?: string
  createdAt: string
}

export type DashboardBooking = {
  _id: string
  name: string
  email: string
  phone: string
  date: string
  timeSlot: string
  status: string
  experienceLevel?: string
  interestedService?: string
  message?: string
  createdAt: string
}

export type DashboardData = {
  cards: DashboardCards
  charts: {
    visitors: Array<{ date: string; visits: number; unique: number }>
    conversions: Array<{ date: string; leads: number; bookings: number }>
  }
  recentActivity: {
    leads: DashboardLead[]
    bookings: DashboardBooking[]
  }
}

export type AdminNotification = {
  _id: string
  type: 'lead' | 'booking' | 'newsletter' | 'contact' | 'blog_comment'
  title: string
  message: string
  read: boolean
  link?: string
  createdAt: string
}
