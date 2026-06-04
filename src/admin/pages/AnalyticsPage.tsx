import { useQuery } from '@tanstack/react-query'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { api } from '../../api'
import { AdminPageHeader } from '../components/ui/PageHeader'
import { formatNumber } from '../utils/format'

export function AnalyticsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'analytics'],
    queryFn: () => api.admin.analytics(30) as Promise<{
      totals: Record<string, number>
      daily: Array<{ date: string; totalVisits: number; leadConversions: number; bookingConversions: number }>
    }>,
  })

  return (
    <div>
      <AdminPageHeader title="Analytics" description="Visitor and conversion metrics (last 30 days)." />
      {isLoading ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            {Object.entries(data?.totals ?? {}).map(([key, val]) => (
              <div key={key} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs uppercase text-slate-500">{key.replace(/([A-Z])/g, ' $1')}</p>
                <p className="mt-1 text-2xl font-bold text-slate-900">{formatNumber(val)}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 h-80 rounded-xl border border-slate-200 bg-white p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.daily ?? []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="totalVisits" fill="#2563eb" name="Visits" />
                <Bar dataKey="leadConversions" fill="#6366f1" name="Leads" />
                <Bar dataKey="bookingConversions" fill="#93c5fd" name="Bookings" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  )
}
