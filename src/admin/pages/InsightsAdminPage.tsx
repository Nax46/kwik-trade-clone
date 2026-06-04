import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { api } from '../../api'
import { Button } from '../../components/ui/Button'
import { AdminInput } from '../components/ui/AdminInput'
import { AdminPageHeader } from '../components/ui/PageHeader'
import { AdminTextarea } from '../components/ui/AdminTextarea'
import { Modal } from '../components/ui/Modal'

export function InsightsAdminPage() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ title: '', excerpt: '', content: '', status: 'draft' })
  const qc = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'insights'],
    queryFn: () => api.admin.insights({ limit: 50 }) as Promise<{ items: Array<{ _id: string; title: string; status: string }> }>,
  })

  return (
    <div>
      <AdminPageHeader
        title="Market insights"
        actions={<Button type="button" onClick={() => setOpen(true)}>New insight</Button>}
      />
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        {isLoading && <p className="p-4 text-sm">Loading…</p>}
        <ul className="divide-y divide-slate-100">
          {data?.items.map((i) => (
            <li
              key={i._id}
              className="flex flex-col gap-1 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6"
            >
              <span className="font-medium text-slate-900">{i.title}</span>
              <span className="text-slate-500">{i.status}</span>
            </li>
          ))}
        </ul>
      </div>
      <Modal isOpen={open} onClose={() => setOpen(false)} title="New insight">
        <div className="space-y-3">
          <AdminInput label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <AdminTextarea label="Excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
          <AdminTextarea label="Content" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={6} />
          <Button type="button" onClick={() => void api.admin.createInsight(form).then(() => { setOpen(false); void qc.invalidateQueries({ queryKey: ['admin', 'insights'] }) })}>
            Save
          </Button>
        </div>
      </Modal>
    </div>
  )
}
