import {
  BarChart2,
  BookOpen,
  CalendarCheck,
  FileDown,
  LayoutDashboard,
  Mail,
  MessageSquareQuote,
  Settings,
  TrendingUp,
  User,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type AdminNavItem = {
  label: string
  to: string
  icon: LucideIcon
}

export const adminNavItems: AdminNavItem[] = [
  { label: 'Dashboard', to: '/admin', icon: LayoutDashboard },
  { label: 'Leads', to: '/admin/leads', icon: Users },
  { label: 'Bookings', to: '/admin/bookings', icon: CalendarCheck },
  { label: 'Blogs', to: '/admin/blogs', icon: BookOpen },
  { label: 'Market Insights', to: '/admin/insights', icon: TrendingUp },
  { label: 'Resources', to: '/admin/resources', icon: FileDown },
  { label: 'Testimonials', to: '/admin/testimonials', icon: MessageSquareQuote },
  { label: 'Newsletter', to: '/admin/newsletter', icon: Mail },
  { label: 'Analytics', to: '/admin/analytics', icon: BarChart2 },
  { label: 'Settings', to: '/admin/settings', icon: Settings },
  { label: 'Profile', to: '/admin/profile', icon: User },
]
