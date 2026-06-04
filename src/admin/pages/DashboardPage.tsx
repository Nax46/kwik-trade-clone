import { useQuery } from '@tanstack/react-query'
import { CalendarCheck, Eye, Mail, UserPlus } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { api } from '../../api'
import { EmptyState } from '../../components/ui/EmptyState'
import { AdminPageHeader } from '../components/ui/PageHeader'
import { StatCard } from '../components/ui/StatCard'
import { formatDate, formatNumber } from '../utils/format'

export function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'dashboard'],
    queryFn: () =>
      api.admin.dashboard() as Promise<{
        cards: Record<string, number>
        charts: {
          visitors: Array<{ date: string; visits: number; unique: number }>
          conversions: Array<{ date: string; leads: number; bookings: number }>
        }
        recentActivity: {
          leads: Array<{ _id: string; name: string; email: string; createdAt: string }>
          bookings: Array<{ _id: string; name: string; date: string; timeSlot: string }>
        }
      }>,
  })

  const cards = data?.cards
  const leads = data?.recentActivity?.leads ?? []
  const bookings = data?.recentActivity?.bookings ?? []

  return (
    <div>
      <AdminPageHeader
        title="Dashboard"
        description="Visitors, leads, bookings, and recent activity."
      />

      <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <StatCard title="Total Visitors" value={cards ? formatNumber(cards.totalVisitors) : '—'} icon={Eye} loading={isLoading} />
        <StatCard title="Unique Visitors" value={cards ? formatNumber(cards.uniqueVisitors) : '—'} icon={Eye} loading={isLoading} />
        <StatCard title="Leads" value={cards ? formatNumber(cards.leads) : '—'} icon={UserPlus} loading={isLoading} />
        <StatCard title="Bookings" value={cards ? formatNumber(cards.bookings) : '—'} icon={CalendarCheck} loading={isLoading} />
        <StatCard title="Blog Posts" value={cards ? formatNumber(cards.blogPosts) : '—'} icon={Mail} loading={isLoading} />
        <StatCard title="Subscribers" value={cards ? formatNumber(cards.subscribers) : '—'} icon={Mail} loading={isLoading} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="admin-card p-4 sm:p-5">
          <h2 className="font-semibold text-slate-900">Visitors (30 days)</h2>
          <div className="mt-4 h-56 sm:h-64">
            {isLoading ? (
              <div className="flex h-full items-center justify-center text-sm text-slate-500">Loading chart…</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data?.charts?.visitors ?? []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="visits" stroke="#2563eb" strokeWidth={2} name="Visits" />
                  <Line type="monotone" dataKey="unique" stroke="#6366f1" strokeWidth={2} name="Unique" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
        <div className="admin-card p-4 sm:p-5">
          <h2 className="font-semibold text-slate-900">Conversions</h2>
          <div className="mt-4 h-56 sm:h-64">
            {isLoading ? (
              <div className="flex h-full items-center justify-center text-sm text-slate-500">Loading chart…</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.charts?.conversions ?? []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="leads" fill="#2563eb" name="Leads" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="bookings" fill="#6366f1" name="Bookings" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="admin-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4 sm:px-6">
            <h2 className="font-semibold text-slate-900">Recent leads</h2>
            <Link to="/admin/leads" className="text-sm font-medium text-brand-600 hover:text-brand-700">
              View all
            </Link>
          </div>
          {isLoading ? (
            <p className="px-6 py-8 text-sm text-slate-500">Loading…</p>
          ) : leads.length === 0 ? (
            <div className="p-4 sm:p-6">
              <EmptyState
                compact
                title="No leads yet"
                description="Contact form submissions will appear here."
              />
            </div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {leads.map((lead) => (
                <li key={lead._id} className="px-4 py-3 text-sm sm:px-6">
                  <span className="font-medium text-slate-900">{lead.name}</span>
                  <span className="text-slate-500"> — {lead.email}</span>
                  <p className="text-xs text-slate-400">{formatDate(lead.createdAt)}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="admin-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4 sm:px-6">
            <h2 className="font-semibold text-slate-900">Recent bookings</h2>
            <Link to="/admin/bookings" className="text-sm font-medium text-brand-600 hover:text-brand-700">
              View all
            </Link>
          </div>
          {isLoading ? (
            <p className="px-6 py-8 text-sm text-slate-500">Loading…</p>
          ) : bookings.length === 0 ? (
            <div className="p-4 sm:p-6">
              <EmptyState
                compact
                title="No bookings yet"
                description="Consultation bookings will appear here."
              />
            </div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {bookings.map((b) => (
                <li key={b._id} className="px-4 py-3 text-sm sm:px-6">
                  <span className="font-medium text-slate-900">{b.name}</span>
                  <p className="text-xs text-slate-500">
                    {b.date} {b.timeSlot}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
