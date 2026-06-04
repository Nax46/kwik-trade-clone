import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { api } from '../../api'
import { useToast } from '../../context/ToastContext'
import { getApiErrorMessage } from '../../lib/apiError'
import { AdminPageHeader } from '../components/ui/PageHeader'
import { formatDate } from '../utils/format'

const statuses = ['', 'new', 'contacted', 'qualified', 'closed'] as const

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
        items: Array<{
          _id: string
          name: string
          email: string
          phone: string
          status: string
          source: string
          createdAt: string
        }>
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

  return (
    <div>
      <AdminPageHeader title="Leads" description="Contact and consultation leads from the website." />
      <div className="mb-4 flex flex-wrap gap-3">
        <input
          type="search"
          placeholder="Search name, email, phone…"
          value={q}
          onChange={(e) => {
            setQ(e.target.value)
            setPage(1)
          }}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
        />
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value)
            setPage(1)
          }}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s || 'All statuses'}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {isLoading && <p className="p-4 text-sm text-slate-500">Loading…</p>}
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-slate-500">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading && data?.items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                  No leads yet. Submissions from the contact and booking forms will appear here.
                </td>
              </tr>
            )}
            {data?.items.map((lead) => (
              <tr key={lead._id} className="border-b border-slate-50">
                <td className="px-4 py-3 font-medium">{lead.name}</td>
                <td className="px-4 py-3">
                  {lead.email}
                  <br />
                  <span className="text-slate-500">{lead.phone}</span>
                </td>
                <td className="px-4 py-3">{lead.source}</td>
                <td className="px-4 py-3">
                  <select
                    value={lead.status}
                    onChange={(e) => void updateStatus(lead._id, e.target.value)}
                    className="rounded border border-slate-200 text-xs"
                  >
                    {statuses.filter(Boolean).map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">
                  <span className="text-slate-500">{formatDate(lead.createdAt)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data && data.pages > 1 && (
          <div className="flex justify-center gap-2 border-t border-slate-100 p-4">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="rounded border px-3 py-1 text-sm disabled:opacity-50"
            >
              Prev
            </button>
            <span className="py-1 text-sm text-slate-600">
              Page {page} of {data.pages}
            </span>
            <button
              type="button"
              disabled={page >= data.pages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded border px-3 py-1 text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
