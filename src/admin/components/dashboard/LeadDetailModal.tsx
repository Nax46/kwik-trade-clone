import { Loader2, Mail, Phone, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { api } from '../../../api'
import { useToast } from '../../../context/ToastContext'
import { getApiErrorMessage } from '../../../lib/apiError'
import type { DashboardLead } from '../../types/dashboard'
import { formatDate } from '../../utils/format'
import { Badge } from '../ui/Badge'
import { Modal } from '../ui/Modal'

type LeadDetailModalProps = {
  lead: DashboardLead | null
  onClose: () => void
  onUpdated: () => void
}

export function LeadDetailModal({ lead, onClose, onUpdated }: LeadDetailModalProps) {
  const { showSuccess, showError } = useToast()
  const [busy, setBusy] = useState<'status' | 'delete' | null>(null)

  if (!lead) return null

  const setStatus = async (status: string) => {
    setBusy('status')
    try {
      await api.admin.updateLead(lead._id, { status })
      showSuccess(`Lead marked as ${status}.`)
      onUpdated()
      onClose()
    } catch (err) {
      showError(getApiErrorMessage(err, 'Could not update lead.'))
    } finally {
      setBusy(null)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Delete this lead permanently?')) return
    setBusy('delete')
    try {
      await api.admin.deleteLead(lead._id)
      showSuccess('Lead deleted.')
      onUpdated()
      onClose()
    } catch (err) {
      showError(getApiErrorMessage(err, 'Could not delete lead.'))
    } finally {
      setBusy(null)
    }
  }

  return (
    <Modal isOpen={!!lead} onClose={onClose} title="Lead details" size="lg">
      <div className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{lead.name}</h3>
            <p className="mt-1 text-sm text-slate-500">{formatDate(lead.createdAt)}</p>
          </div>
          <Badge label={lead.status} variant={lead.status} />
        </div>

        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-slate-500">Email</dt>
            <dd className="mt-0.5 break-all font-medium text-slate-900">
              <a href={`mailto:${lead.email}`} className="text-brand-600 hover:underline">
                {lead.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">Phone</dt>
            <dd className="mt-0.5 font-medium text-slate-900">
              <a href={`tel:${lead.phone}`} className="hover:text-brand-600">
                {lead.phone}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">Source</dt>
            <dd className="mt-0.5 capitalize text-slate-900">{lead.source}</dd>
          </div>
          {lead.interestedService && (
            <div>
              <dt className="text-slate-500">Service</dt>
              <dd className="mt-0.5 text-slate-900">{lead.interestedService}</dd>
            </div>
          )}
          {lead.experienceLevel && (
            <div>
              <dt className="text-slate-500">Experience</dt>
              <dd className="mt-0.5 text-slate-900">{lead.experienceLevel}</dd>
            </div>
          )}
        </dl>

        {lead.message && (
          <div className="rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm text-slate-700">
            {lead.message}
          </div>
        )}

        <div className="flex flex-col gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            disabled={!!busy || lead.status === 'contacted'}
            onClick={() => void setStatus('contacted')}
            className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 sm:flex-none"
          >
            {busy === 'status' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Phone className="h-4 w-4" />}
            Mark contacted
          </button>
          <button
            type="button"
            disabled={!!busy || lead.status === 'qualified'}
            onClick={() => void setStatus('qualified')}
            className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-500 disabled:opacity-50 sm:flex-none"
          >
            {busy === 'status' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
            Mark converted
          </button>
          <button
            type="button"
            disabled={!!busy}
            onClick={() => void handleDelete()}
            className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50 sm:flex-none"
          >
            {busy === 'delete' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
            Delete
          </button>
        </div>
      </div>
    </Modal>
  )
}
