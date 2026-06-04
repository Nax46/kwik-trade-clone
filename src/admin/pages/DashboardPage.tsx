import { useQueryClient } from '@tanstack/react-query'
import { CalendarCheck, ChevronRight, FileText, Mail, UserPlus, Users } from 'lucide-react'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
import { EmptyState } from '../../components/ui/EmptyState'
import { Skeleton } from '../../components/ui/Skeleton'
import { BookingDetailModal } from '../components/dashboard/BookingDetailModal'
import { LeadDetailModal } from '../components/dashboard/LeadDetailModal'
import { AdminPageHeader } from '../components/ui/PageHeader'
import { StatCard } from '../components/ui/StatCard'
import { useDashboard } from '../hooks/useDashboard'
import type { DashboardBooking, DashboardLead } from '../types/dashboard'
import { formatDate, formatNumber } from '../utils/format'
import { Badge } from '../components/ui/Badge'

const tooltipStyle = {
  backgroundColor: '#fff',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  fontSize: '12px',
  boxShadow: '0 4px 12px rgba(15,23,42,0.08)',
}

function ChartSkeleton() {
  return (
    <div className="mt-4 space-y-3">
      <Skeleton className="h-56 w-full sm:h-64" />
    </div>
  )
}

type ChartPanelProps = {
  title: string
  loading: boolean
  empty: boolean
  emptyMessage: string
  onOpen: () => void
  children: ReactNode
}

function ChartPanel({ title, loading, empty, emptyMessage, onOpen, children }: ChartPanelProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="admin-card w-full cursor-pointer p-4 text-left transition duration-200 hover:scale-[1.01] hover:border-brand-300 hover:shadow-[0_8px_32px_-8px_rgba(37,99,235,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 sm:p-5"
      aria-label={`${title} — open analytics`}
    >
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-semibold text-slate-900">{title}</h2>
        <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
      </div>
      <div className="mt-4">
        {loading ? (
          <ChartSkeleton />
        ) : empty ? (
          <EmptyState compact title="No data yet" description={emptyMessage} />
        ) : (
          children
        )}
      </div>
    </button>
  )
}

export function DashboardPage() {
  const navigate = useNavigate()
  const qc = useQueryClient()
  const { data, isLoading, isError } = useDashboard()
  const [selectedLead, setSelectedLead] = useState<DashboardLead | null>(null)
  const [selectedBooking, setSelectedBooking] = useState<DashboardBooking | null>(null)

  const refresh = () => {
    void qc.invalidateQueries({ queryKey: ['admin', 'dashboard'] })
    void qc.invalidateQueries({ queryKey: ['admin', 'notifications'] })
    void qc.invalidateQueries({ queryKey: ['admin', 'leads'] })
    void qc.invalidateQueries({ queryKey: ['admin', 'bookings'] })
  }

  const cards = data?.cards
  const leads = data?.recentActivity?.leads ?? []
  const bookings = data?.recentActivity?.bookings ?? []
  const visitors = data?.charts?.visitors ?? []
  const conversions = data?.charts?.conversions ?? []

  const formatChartDate = (date: string) => {
    try {
      return new Date(date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })
    } catch {
      return date
    }
  }

  return (
    <div className="min-w-0">
      <AdminPageHeader
        title="Dashboard"
        description="Live visitors, leads, bookings, and recent activity. Updates every 30 seconds."
      />

      {isError && (
        <p className="alert-error mb-6" role="alert">
          Could not load dashboard data. Please refresh the page.
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <StatCard
          title="Total Visitors"
          value={cards ? formatNumber(cards.totalVisitors) : '—'}
          icon={Users}
          loading={isLoading}
          to="/admin/analytics"
        />
        <StatCard
          title="Unique Visitors"
          value={cards ? formatNumber(cards.uniqueVisitors) : '—'}
          icon={Users}
          loading={isLoading}
          to="/admin/analytics"
        />
        <StatCard
          title="Leads"
          value={cards ? formatNumber(cards.leads) : '—'}
          icon={UserPlus}
          loading={isLoading}
          to="/admin/leads"
        />
        <StatCard
          title="Bookings"
          value={cards ? formatNumber(cards.bookings) : '—'}
          icon={CalendarCheck}
          loading={isLoading}
          to="/admin/bookings"
        />
        <StatCard
          title="Blog Posts"
          value={cards ? formatNumber(cards.blogPosts) : '—'}
          icon={FileText}
          loading={isLoading}
          to="/admin/blogs"
        />
        <StatCard
          title="Subscribers"
          value={cards ? formatNumber(cards.subscribers) : '—'}
          icon={Mail}
          loading={isLoading}
          to="/admin/newsletter"
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <ChartPanel
          title="Visitors (30 days)"
          loading={isLoading}
          empty={!isLoading && visitors.length === 0}
          emptyMessage="Visitor tracking will appear once users browse the site."
          onOpen={() => navigate('/admin/analytics')}
        >
          <div className="h-56 w-full sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visitors} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10 }}
                  tickFormatter={formatChartDate}
                  interval="preserveStartEnd"
                />
                <YAxis tick={{ fontSize: 10 }} width={32} />
                <Tooltip
                  contentStyle={tooltipStyle}
                  labelFormatter={(label) => formatChartDate(String(label))}
                />
                <Line
                  type="monotone"
                  dataKey="visits"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={false}
                  name="Visits"
                />
                <Line
                  type="monotone"
                  dataKey="unique"
                  stroke="#6366f1"
                  strokeWidth={2}
                  dot={false}
                  name="Unique"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartPanel>

        <ChartPanel
          title="Conversions"
          loading={isLoading}
          empty={!isLoading && conversions.length === 0}
          emptyMessage="Lead and booking conversions will show here over time."
          onOpen={() => navigate('/admin/analytics')}
        >
          <div className="h-56 w-full sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conversions} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10 }}
                  tickFormatter={formatChartDate}
                  interval="preserveStartEnd"
                />
                <YAxis tick={{ fontSize: 10 }} width={32} allowDecimals={false} />
                <Tooltip
                  contentStyle={tooltipStyle}
                  labelFormatter={(label) => formatChartDate(String(label))}
                />
                <Bar dataKey="leads" fill="#2563eb" name="Leads" radius={[4, 4, 0, 0]} />
                <Bar dataKey="bookings" fill="#6366f1" name="Bookings" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartPanel>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="admin-card overflow-hidden" aria-labelledby="recent-leads-heading">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4 sm:px-6">
            <h2 id="recent-leads-heading" className="font-semibold text-slate-900">
              Recent leads
            </h2>
            <Link
              to="/admin/leads"
              className="text-sm font-medium text-brand-600 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              View all
            </Link>
          </div>
          {isLoading ? (
            <ul className="divide-y divide-slate-100 p-4 sm:p-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <li key={i} className="py-3">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="mt-2 h-3 w-56" />
                </li>
              ))}
            </ul>
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
                <li key={lead._id}>
                  <button
                    type="button"
                    onClick={() => setSelectedLead(lead)}
                    className="flex w-full flex-col gap-1 px-4 py-3 text-left transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-500 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                  >
                    <div className="min-w-0">
                      <span className="font-medium text-slate-900">{lead.name}</span>
                      <span className="block truncate text-sm text-slate-500 sm:inline sm:ml-1">
                        — {lead.email}
                      </span>
                      <p className="text-xs text-slate-400">{formatDate(lead.createdAt)}</p>
                    </div>
                    <Badge label={lead.status} variant={lead.status} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="admin-card overflow-hidden" aria-labelledby="recent-bookings-heading">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4 sm:px-6">
            <h2 id="recent-bookings-heading" className="font-semibold text-slate-900">
              Recent bookings
            </h2>
            <Link
              to="/admin/bookings"
              className="text-sm font-medium text-brand-600 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              View all
            </Link>
          </div>
          {isLoading ? (
            <ul className="divide-y divide-slate-100 p-4 sm:p-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <li key={i} className="py-3">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="mt-2 h-3 w-48" />
                </li>
              ))}
            </ul>
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
                <li key={b._id}>
                  <button
                    type="button"
                    onClick={() => setSelectedBooking(b)}
                    className="flex w-full flex-col gap-1 px-4 py-3 text-left transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-500 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                  >
                    <div className="min-w-0">
                      <span className="font-medium text-slate-900">{b.name}</span>
                      <p className="text-xs text-slate-500">
                        {b.date} {b.timeSlot}
                      </p>
                    </div>
                    <Badge label={b.status} variant={b.status} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <LeadDetailModal
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
        onUpdated={refresh}
      />
      <BookingDetailModal
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
        onUpdated={refresh}
      />
    </div>
  )
}
