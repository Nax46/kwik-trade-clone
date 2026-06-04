import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { api } from '../../api'
import { AdminInput } from '../components/ui/AdminInput'
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

export function BlogsAdminPage() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState<string | null>(null)
  const qc = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'blogs'],
    queryFn: () => api.admin.blogs({ limit: 50 }) as Promise<{ items: Array<{ _id: string; title: string; status: string; category: string; slug: string }> }>,
  })

  const save = async () => {
    if (editId) await api.admin.updateBlog(editId, form)
    else await api.admin.createBlog(form)
    setOpen(false)
    setEditId(null)
    setForm(empty)
    void qc.invalidateQueries({ queryKey: ['admin', 'blogs'] })
  }

  return (
    <div>
      <AdminPageHeader
        title="Blogs"
        description="Create, edit, publish or draft blog posts."
        actions={
          <Button type="button" onClick={() => { setEditId(null); setForm(empty); setOpen(true) }}>
            New post
          </Button>
        }
      />
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {isLoading && <p className="p-4 text-sm text-slate-500">Loading…</p>}
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-slate-500">
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {data?.items.map((b) => (
              <tr key={b._id} className="border-b border-slate-50">
                <td className="px-4 py-3 font-medium">{b.title}</td>
                <td className="px-4 py-3">{b.category}</td>
                <td className="px-4 py-3">{b.status}</td>
                <td className="px-4 py-3 text-right">
                  <button type="button" className="text-brand-600 text-sm" onClick={() => { setEditId(b._id); setOpen(true) }}>
                    Edit
                  </button>
                  <button type="button" className="ml-3 text-red-600 text-sm" onClick={() => void api.admin.deleteBlog(b._id).then(() => qc.invalidateQueries({ queryKey: ['admin', 'blogs'] }))}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={open} onClose={() => setOpen(false)} title={editId ? 'Edit blog' : 'New blog'}>
        <div className="space-y-3">
          <AdminInput label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <AdminInput label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <AdminTextarea label="Excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
          <AdminTextarea label="Content" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={8} />
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as 'draft' | 'published' })} className="w-full rounded border px-3 py-2 text-sm">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <Button type="button" onClick={() => void save()}>Save</Button>
        </div>
      </Modal>
    </div>
  )
}
