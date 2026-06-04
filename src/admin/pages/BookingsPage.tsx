import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { api } from '../../api'
import { useToast } from '../../context/ToastContext'
import { getApiErrorMessage } from '../../lib/apiError'
import { AdminPageHeader } from '../components/ui/PageHeader'
import { formatDate } from '../utils/format'

const statuses = ['pending', 'approved', 'rejected', 'completed'] as const

export function BookingsPage() {
  const { showSuccess, showError } = useToast()
  const [page] = useState(1)
  const qc = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'bookings', page],
    queryFn: () =>
      api.admin.bookings({ page, limit: 10 }) as Promise<{
        items: Array<{
          _id: string
          name: string
          email: string
          phone: string
          date: string
          timeSlot: string
          status: string
          createdAt: string
        }>
        total: number
      }>,
  })

  const update = async (id: string, status: string) => {
    try {
      await api.admin.updateBooking(id, { status })
      void qc.invalidateQueries({ queryKey: ['admin', 'bookings'] })
      showSuccess('Booking status updated.')
    } catch (err) {
      showError(getApiErrorMessage(err, 'Could not update booking status.'))
    }
  }

  return (
    <div>
      <AdminPageHeader title="Consultation bookings" description="Approve, reject, or complete bookings." />
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {isLoading && <p className="p-4 text-sm text-slate-500">Loading…</p>}
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-slate-500">
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Slot</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Requested</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading && data?.items.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                  No bookings yet. Consultation form submissions will appear here.
                </td>
              </tr>
            )}
            {data?.items.map((b) => (
              <tr key={b._id} className="border-b border-slate-50">
                <td className="px-4 py-3">
                  <p className="font-medium">{b.name}</p>
                  <p className="text-slate-500">{b.email} · {b.phone}</p>
                </td>
                <td className="px-4 py-3">
                  {b.date} {b.timeSlot}
                </td>
                <td className="px-4 py-3">
                  <select
                    value={b.status}
                    onChange={(e) => void update(b._id, e.target.value)}
                    className="rounded border border-slate-200 text-xs"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3 text-slate-500">{formatDate(b.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
