import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { api } from '../../api'
import { AdminInput } from '../components/ui/AdminInput'
import { MobileRecordCard } from '../components/ui/MobileRecordCard'
import { AdminPageHeader } from '../components/ui/PageHeader'
import { AdminTextarea } from '../components/ui/AdminTextarea'
import { Button } from '../../components/ui/Button'
import { Modal } from '../components/ui/Modal'

const empty = {
  title: '',
  excerpt: '',
  content: '',
  category: 'Trading Basics',
  status: 'draft' as 'draft' | 'published',
  author: 'Manish',
}

type BlogItem = { _id: string; title: string; status: string; category: string; slug: string }

export function BlogsAdminPage() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState<string | null>(null)
  const qc = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'blogs'],
    queryFn: () => api.admin.blogs({ limit: 50 }) as Promise<{ items: BlogItem[] }>,
  })

  const save = async () => {
    if (editId) await api.admin.updateBlog(editId, form)
    else await api.admin.createBlog(form)
    setOpen(false)
    setEditId(null)
    setForm(empty)
    void qc.invalidateQueries({ queryKey: ['admin', 'blogs'] })
  }

  const openEdit = (b: BlogItem) => {
    setEditId(b._id)
    setOpen(true)
  }

  const rowActions = (b: BlogItem) => (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        className="min-h-[44px] rounded-lg px-3 py-2 text-sm font-medium text-brand-600 hover:bg-brand-50"
        onClick={() => openEdit(b)}
      >
        Edit
      </button>
      <button
        type="button"
        className="min-h-[44px] rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
        onClick={() =>
          void api.admin.deleteBlog(b._id).then(() => qc.invalidateQueries({ queryKey: ['admin', 'blogs'] }))
        }
      >
        Delete
      </button>
    </div>
  )

  return (
    <div className="min-w-0">
      <AdminPageHeader
        title="Blogs"
        description="Create, edit, publish or draft blog posts."
        actions={
          <Button
            type="button"
            className="w-full sm:w-auto"
            onClick={() => {
              setEditId(null)
              setForm(empty)
              setOpen(true)
            }}
          >
            New post
          </Button>
        }
      />
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {isLoading && <p className="p-4 text-sm text-slate-500">Loading…</p>}

        {!isLoading && data && data.items.length > 0 && (
          <div className="hidden md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-slate-50 text-slate-500">
                  <th className="px-4 py-3 text-left font-semibold sm:px-6">Title</th>
                  <th className="px-4 py-3 text-left font-semibold sm:px-6">Category</th>
                  <th className="px-4 py-3 text-left font-semibold sm:px-6">Status</th>
                  <th className="px-4 py-3 text-right font-semibold sm:px-6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((b) => (
                  <tr key={b._id} className="border-b border-slate-50">
                    <td className="px-4 py-3 font-medium sm:px-6">{b.title}</td>
                    <td className="px-4 py-3 sm:px-6">{b.category}</td>
                    <td className="px-4 py-3 sm:px-6">{b.status}</td>
                    <td className="px-4 py-3 text-right sm:px-6">{rowActions(b)}</td>
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
                    { label: 'Category', value: b.category },
                    { label: 'Status', value: b.status },
                  ]}
                  footer={rowActions(b)}
                >
                  <p className="mb-3 text-base font-semibold text-slate-900">{b.title}</p>
                </MobileRecordCard>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Modal isOpen={open} onClose={() => setOpen(false)} title={editId ? 'Edit blog' : 'New blog'}>
        <div className="space-y-3">
          <AdminInput label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <AdminInput label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <AdminTextarea label="Excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
          <AdminTextarea label="Content" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={8} />
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value as 'draft' | 'published' })}
            className="input-base"
            aria-label="Post status"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <Button type="button" className="w-full sm:w-auto" onClick={() => void save()}>
            Save
          </Button>
        </div>
      </Modal>
    </div>
  )
}
