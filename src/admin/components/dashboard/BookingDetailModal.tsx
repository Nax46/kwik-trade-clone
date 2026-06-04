import { CalendarCheck, CheckCircle2, Loader2, XCircle } from 'lucide-react'
import { useState } from 'react'
import { api } from '../../../api'
import { useToast } from '../../../context/ToastContext'
import { getApiErrorMessage } from '../../../lib/apiError'
import type { DashboardBooking } from '../../types/dashboard'
import { formatDate } from '../../utils/format'
import { Badge } from '../ui/Badge'
import { Modal } from '../ui/Modal'

type BookingDetailModalProps = {
  booking: DashboardBooking | null
  onClose: () => void
  onUpdated: () => void
}

export function BookingDetailModal({ booking, onClose, onUpdated }: BookingDetailModalProps) {
  const { showSuccess, showError } = useToast()
  const [busy, setBusy] = useState(false)

  if (!booking) return null

  const updateStatus = async (status: string, label: string) => {
    setBusy(true)
    try {
      await api.admin.updateBooking(booking._id, { status })
      showSuccess(`Booking ${label}.`)
      onUpdated()
      onClose()
    } catch (err) {
      showError(getApiErrorMessage(err, 'Could not update booking.'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <Modal isOpen={!!booking} onClose={onClose} title="Booking details" size="lg">
      <div className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{booking.name}</h3>
            <p className="mt-1 text-sm text-slate-500">Requested {formatDate(booking.createdAt)}</p>
          </div>
          <Badge label={booking.status} variant={booking.status} />
        </div>

        <div className="rounded-lg border border-brand-100 bg-brand-50/50 p-4">
          <p className="text-sm font-medium text-brand-800">Consultation slot</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">
            {booking.date} · {booking.timeSlot} IST
          </p>
        </div>

        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-slate-500">Email</dt>
            <dd className="mt-0.5 break-all">
              <a href={`mailto:${booking.email}`} className="font-medium text-brand-600 hover:underline">
                {booking.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">Phone</dt>
            <dd className="mt-0.5 font-medium text-slate-900">{booking.phone}</dd>
          </div>
          {booking.interestedService && (
            <div>
              <dt className="text-slate-500">Service</dt>
              <dd className="mt-0.5 text-slate-900">{booking.interestedService}</dd>
            </div>
          )}
          {booking.experienceLevel && (
            <div>
              <dt className="text-slate-500">Experience</dt>
              <dd className="mt-0.5 text-slate-900">{booking.experienceLevel}</dd>
            </div>
          )}
        </dl>

        {booking.message && (
          <div className="rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm text-slate-700">
            {booking.message}
          </div>
        )}

        <div className="flex flex-col gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            disabled={busy || booking.status === 'approved'}
            onClick={() => void updateStatus('approved', 'confirmed')}
            className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-500 disabled:opacity-50 sm:flex-none"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <CalendarCheck className="h-4 w-4" />}
            Confirm
          </button>
          <button
            type="button"
            disabled={busy || booking.status === 'completed'}
            onClick={() => void updateStatus('completed', 'marked complete')}
            className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg border border-emerald-200 px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-50 disabled:opacity-50 sm:flex-none"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
            Complete
          </button>
          <button
            type="button"
            disabled={busy || booking.status === 'rejected'}
            onClick={() => void updateStatus('rejected', 'cancelled')}
            className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50 sm:flex-none"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4" />}
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  )
}
