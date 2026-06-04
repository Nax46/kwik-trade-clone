import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { api } from '../../api'
import { useToast } from '../../context/ToastContext'
import { getApiErrorMessage } from '../../lib/apiError'
import { MobileRecordCard } from '../components/ui/MobileRecordCard'
import { AdminPageHeader } from '../components/ui/PageHeader'
import { formatDate } from '../utils/format'

const statuses = ['', 'new', 'contacted', 'qualified', 'closed'] as const

type Lead = {
  _id: string
  name: string
  email: string
  phone: string
  status: string
  source: string
  createdAt: string
}

export function LeadsPage() {
  const { showSuccess, showError } = useToast()
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState('')
  const [q, setQ] = useState('')
  const qc = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'leads', page, status, q],
    queryFn: () =>
      api.admin.leads({
        page,
        limit: 10,
        ...(status ? { status } : {}),
        ...(q ? { q } : {}),
      }) as Promise<{
        items: Lead[]
        total: number
        pages: number
      }>,
  })

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await api.admin.updateLead(id, { status: newStatus })
      void qc.invalidateQueries({ queryKey: ['admin', 'leads'] })
      showSuccess('Lead status updated.')
    } catch (err) {
      showError(getApiErrorMessage(err, 'Could not update lead status.'))
    }
  }

  const statusSelect = (lead: Lead) => (
    <select
      value={lead.status}
      onChange={(e) => void updateStatus(lead._id, e.target.value)}
      className="w-full min-h-[44px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
      aria-label={`Status for ${lead.name}`}
    >
      {statuses.filter(Boolean).map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  )

  return (
    <div className="min-w-0">
      <AdminPageHeader title="Leads" description="Contact and consultation leads from the website." />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <input
          type="search"
          placeholder="Search name, email, phone…"
          value={q}
          onChange={(e) => {
            setQ(e.target.value)
            setPage(1)
          }}
          className="input-base w-full sm:max-w-xs"
          aria-label="Search leads"
        />
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value)
            setPage(1)
          }}
          className="input-base w-full sm:w-auto sm:min-w-[160px]"
          aria-label="Filter by status"
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s || 'All statuses'}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {isLoading && (
          <p className="p-4 text-sm text-slate-500" role="status">
            Loading…
          </p>
        )}

        {!isLoading && data?.items.length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-slate-500">
            No leads yet. Submissions from the contact and booking forms will appear here.
          </p>
        )}

        {/* Desktop table */}
        {!isLoading && data && data.items.length > 0 && (
          <div className="hidden md:block">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50 text-slate-500">
                  <th className="px-4 py-3 font-semibold sm:px-6">Name</th>
                  <th className="px-4 py-3 font-semibold sm:px-6">Contact</th>
                  <th className="px-4 py-3 font-semibold sm:px-6">Source</th>
                  <th className="px-4 py-3 font-semibold sm:px-6">Status</th>
                  <th className="px-4 py-3 font-semibold sm:px-6">Date</th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((lead) => (
                  <tr key={lead._id} className="border-b border-slate-50 hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-medium text-slate-900 sm:px-6">{lead.name}</td>
                    <td className="px-4 py-3 sm:px-6">
                      <a href={`mailto:${lead.email}`} className="text-brand-600 hover:underline">
                        {lead.email}
                      </a>
                      <br />
                      <a href={`tel:${lead.phone}`} className="text-slate-500 hover:text-slate-700">
                        {lead.phone}
                      </a>
                    </td>
                    <td className="px-4 py-3 sm:px-6">{lead.source}</td>
                    <td className="px-4 py-3 sm:px-6">{statusSelect(lead)}</td>
                    <td className="px-4 py-3 text-slate-500 sm:px-6">{formatDate(lead.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Mobile cards */}
        {!isLoading && data && data.items.length > 0 && (
          <ul className="space-y-3 p-4 md:hidden" role="list">
            {data.items.map((lead) => (
              <li key={lead._id}>
                <MobileRecordCard
                  fields={[
                    {
                      label: 'Contact',
                      value: (
                        <>
                          <a href={`mailto:${lead.email}`} className="text-brand-600 hover:underline">
                            {lead.email}
                          </a>
                          <br />
                          <a href={`tel:${lead.phone}`} className="text-slate-600">
                            {lead.phone}
                          </a>
                        </>
                      ),
                    },
                    { label: 'Source', value: lead.source },
                    { label: 'Status', value: statusSelect(lead) },
                    { label: 'Date', value: formatDate(lead.createdAt) },
                  ]}
                >
                  <p className="mb-3 text-base font-semibold text-slate-900">{lead.name}</p>
                </MobileRecordCard>
              </li>
            ))}
          </ul>
        )}

        {data && data.pages > 1 && (
          <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 p-4 sm:flex-row">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium disabled:opacity-50 sm:w-auto"
            >
              Previous
            </button>
            <span className="text-sm text-slate-600">
              Page {page} of {data.pages}
            </span>
            <button
              type="button"
              disabled={page >= data.pages}
              onClick={() => setPage((p) => p + 1)}
              className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium disabled:opacity-50 sm:w-auto"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
