import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { api } from '../../api'
import { useToast } from '../../context/ToastContext'
import { getApiErrorMessage } from '../../lib/apiError'
import { MobileRecordCard } from '../components/ui/MobileRecordCard'
import { AdminPageHeader } from '../components/ui/PageHeader'
import { formatDate } from '../utils/format'

const statuses = ['pending', 'approved', 'rejected', 'completed'] as const

type Booking = {
  _id: string
  name: string
  email: string
  phone: string
  date: string
  timeSlot: string
  status: string
  createdAt: string
}

export function BookingsPage() {
  const { showSuccess, showError } = useToast()
  const [page] = useState(1)
  const qc = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'bookings', page],
    queryFn: () =>
      api.admin.bookings({ page, limit: 10 }) as Promise<{
        items: Booking[]
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

  const statusSelect = (b: Booking) => (
    <select
      value={b.status}
      onChange={(e) => void update(b._id, e.target.value)}
      className="w-full min-h-[44px] rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
      aria-label={`Status for booking by ${b.name}`}
    >
      {statuses.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  )

  return (
    <div className="min-w-0">
      <AdminPageHeader title="Consultation bookings" description="Approve, reject, or complete bookings." />
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {isLoading && (
          <p className="p-4 text-sm text-slate-500" role="status">
            Loading…
          </p>
        )}

        {!isLoading && data?.items.length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-slate-500">
            No bookings yet. Consultation form submissions will appear here.
          </p>
        )}

        {!isLoading && data && data.items.length > 0 && (
          <div className="hidden md:block">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-slate-500">
                  <th className="px-4 py-3 font-semibold sm:px-6">Client</th>
                  <th className="px-4 py-3 font-semibold sm:px-6">Slot</th>
                  <th className="px-4 py-3 font-semibold sm:px-6">Status</th>
                  <th className="px-4 py-3 font-semibold sm:px-6">Requested</th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((b) => (
                  <tr key={b._id} className="border-b border-slate-50">
                    <td className="px-4 py-3 sm:px-6">
                      <p className="font-medium">{b.name}</p>
                      <p className="text-slate-500">
                        {b.email} · {b.phone}
                      </p>
                    </td>
                    <td className="px-4 py-3 sm:px-6">
                      {b.date} {b.timeSlot}
                    </td>
                    <td className="px-4 py-3 sm:px-6">{statusSelect(b)}</td>
                    <td className="px-4 py-3 text-slate-500 sm:px-6">{formatDate(b.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!isLoading && data && data.items.length > 0 && (
          <ul className="space-y-3 p-4 md:hidden" role="list">
            {data.items.map((b) => (
              <li key={b._id}>
                <MobileRecordCard
                  fields={[
                    {
                      label: 'Contact',
                      value: (
                        <>
                          {b.email}
                          <br />
                          {b.phone}
                        </>
                      ),
                    },
                    { label: 'Slot', value: `${b.date} ${b.timeSlot}` },
                    { label: 'Status', value: statusSelect(b) },
                    { label: 'Requested', value: formatDate(b.createdAt) },
                  ]}
                >
                  <p className="mb-3 text-base font-semibold text-slate-900">{b.name}</p>
                </MobileRecordCard>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
