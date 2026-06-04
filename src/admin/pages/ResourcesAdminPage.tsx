import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { api } from '../../api'
import { Button } from '../../components/ui/Button'
import { AdminInput } from '../components/ui/AdminInput'
import { AdminPageHeader } from '../components/ui/PageHeader'
import { AdminTextarea } from '../components/ui/AdminTextarea'
import { Modal } from '../components/ui/Modal'

export function ResourcesAdminPage() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', pdfUrl: '', category: 'Guides' })
  const qc = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'resources'],
    queryFn: () => api.admin.resources() as Promise<Array<{ _id: string; title: string; category: string; isActive: boolean }>>,
  })

  return (
    <div>
      <AdminPageHeader title="Resources" actions={<Button type="button" onClick={() => setOpen(true)}>Add resource</Button>} />
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        {isLoading && <p className="p-4 text-sm">Loading…</p>}
        <ul className="divide-y divide-slate-100">
          {(data ?? []).map((r) => (
            <li key={r._id} className="flex justify-between px-4 py-3 text-sm">
              <span>{r.title}</span>
              <button type="button" className="text-red-600" onClick={() => void api.admin.deleteResource(r._id).then(() => qc.invalidateQueries({ queryKey: ['admin', 'resources'] }))}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Modal isOpen={open} onClose={() => setOpen(false)} title="New resource">
        <div className="space-y-3">
          <AdminInput label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <AdminTextarea label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <AdminInput label="PDF URL" value={form.pdfUrl} onChange={(e) => setForm({ ...form, pdfUrl: e.target.value })} />
          <AdminInput label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <Button type="button" onClick={() => void api.admin.createResource(form).then(() => { setOpen(false); void qc.invalidateQueries({ queryKey: ['admin', 'resources'] }) })}>
            Save
          </Button>
        </div>
      </Modal>
    </div>
  )
}
