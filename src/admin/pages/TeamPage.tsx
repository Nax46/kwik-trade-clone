import { Loader2 } from 'lucide-react'
import { useCallback, useState } from 'react'
import { AdminInput } from '../components/ui/AdminInput'
import { AdminTextarea } from '../components/ui/AdminTextarea'
import { Badge } from '../components/ui/Badge'
import { ConfirmDialog } from '../components/ui/ConfirmDialog'
import { DataTable } from '../components/ui/DataTable'
import { FilterSelect } from '../components/ui/FilterSelect'
import { Modal } from '../components/ui/Modal'
import { AdminPageHeader } from '../components/ui/PageHeader'
import { RowActions } from '../components/ui/RowActions'
import { TableCard } from '../components/ui/TableCard'
import { useModal, usePaginatedList } from '../hooks'
import { mockApi } from '../services/mockApi'
import type { TeamMember } from '../types'

const publishedOptions = [
  { value: '', label: 'All' },
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
]

const emptyForm = { name: '', role: '', bio: '', image: '', published: true }

export function TeamPage() {
  const list = usePaginatedList(useCallback((p) => mockApi.listTeam(p), []))
  const modal = useModal<TeamMember>()
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const openCreate = () => {
    setForm(emptyForm)
    modal.openCreate()
  }

  const openEdit = (item: TeamMember) => {
    setForm({
      name: item.name,
      role: item.role,
      bio: item.bio,
      image: item.image,
      published: item.published,
    })
    modal.openEdit(item)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = {
        ...form,
        image: form.image || form.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase(),
      }
      if (modal.isEditing && modal.editingItem) {
        await mockApi.updateTeamMember(modal.editingItem.id, payload)
      } else {
        await mockApi.createTeamMember(payload)
      }
      modal.close()
      list.refresh()
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    setDeleting(true)
    try {
      await mockApi.deleteTeamMember(deleteId)
      setDeleteId(null)
      list.refresh()
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div>
      <AdminPageHeader title="Team Members" description="Manage leadership profiles on the About page." />

      <TableCard
        search={list.search}
        onSearchChange={list.setSearch}
        onAdd={openCreate}
        addLabel="Add member"
        onReset={list.resetFilters}
        page={list.page}
        totalPages={list.totalPages}
        total={list.total}
        onPageChange={list.goToPage}
        filters={
          <FilterSelect
            label="Published"
            value={list.publishedFilter}
            onChange={list.setPublishedFilter}
            options={publishedOptions}
          />
        }
      >
        <DataTable<TeamMember>
          rowKey={(r) => r.id}
          loading={list.loading}
          columns={[
            {
              key: 'avatar',
              header: '',
              render: (r) => (
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-100 text-xs font-bold text-brand-700">
                  {r.image}
                </span>
              ),
            },
            { key: 'name', header: 'Name', render: (r) => <span className="font-medium text-slate-900">{r.name}</span> },
            { key: 'role', header: 'Role', render: (r) => r.role },
            {
              key: 'published',
              header: 'Status',
              render: (r) => (
                <Badge label={r.published ? 'published' : 'draft'} variant={r.published ? 'published' : 'draft'} />
              ),
            },
          ]}
          data={list.data}
          actions={(row) => (
            <RowActions onEdit={() => openEdit(row)} onDelete={() => setDeleteId(row.id)} />
          )}
        />
      </TableCard>

      <Modal isOpen={modal.isOpen} onClose={modal.close} title={modal.isEditing ? 'Edit team member' : 'Add team member'} size="lg">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminInput label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <AdminInput label="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required />
            <AdminInput label="Initials (avatar)" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="e.g. VH" />
          </div>
          <AdminTextarea label="Bio" rows={4} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} required />
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
              className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            />
            Published on website
          </label>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={modal.close} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-500 disabled:opacity-60">
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              Save
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete team member"
        message="This profile will be removed from the About page."
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}
