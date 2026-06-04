import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { api } from '../../api'
import { Button } from '../../components/ui/Button'
import { AdminInput } from '../components/ui/AdminInput'
import { AdminTextarea } from '../components/ui/AdminTextarea'
import { AdminPageHeader } from '../components/ui/PageHeader'
import { Modal } from '../components/ui/Modal'

export function TestimonialsPage() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', role: '', content: '', rating: 5 })
  const qc = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'testimonials'],
    queryFn: () =>
      api.admin.testimonials() as Promise<
        Array<{ _id: string; name: string; role: string; content: string; isPublished: boolean }>
      >,
  })

  return (
    <div>
      <AdminPageHeader
        title="Testimonials"
        actions={<Button type="button" onClick={() => setOpen(true)}>Add</Button>}
      />
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        {isLoading && <p className="p-4 text-sm">Loading…</p>}
        <ul className="divide-y divide-slate-100">
          {(data ?? []).map((t) => (
            <li key={t._id} className="px-4 py-3 text-sm">
              <p className="font-medium">{t.name} — {t.role}</p>
              <p className="text-slate-600">{t.content}</p>
              <button
                type="button"
                className="mt-2 text-red-600"
                onClick={() => void api.admin.deleteTestimonial(t._id).then(() => qc.invalidateQueries({ queryKey: ['admin', 'testimonials'] }))}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Modal isOpen={open} onClose={() => setOpen(false)} title="New testimonial">
        <div className="space-y-3">
          <AdminInput label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <AdminInput label="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
          <AdminTextarea label="Quote" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
          <Button
            type="button"
            onClick={() =>
              void api.admin.createTestimonial(form).then(() => {
                setOpen(false)
                void qc.invalidateQueries({ queryKey: ['admin', 'testimonials'] })
              })
            }
          >
            Save
          </Button>
        </div>
      </Modal>
    </div>
  )
}
