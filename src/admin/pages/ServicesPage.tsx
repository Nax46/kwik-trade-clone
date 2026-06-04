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
import type { AdminService } from '../types'

const activeOptions = [
  { value: '', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
]

const emptyForm = {
  title: '',
  summary: '',
  description: '',
  features: '',
  active: true,
  sortOrder: 1,
}

export function ServicesPage() {
  const list = usePaginatedList(
    useCallback(
      (p) =>
        mockApi.listServices({
          ...p,
          status: p.status,
        }),
      [],
    ),
  )
  const modal = useModal<AdminService>()
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const openCreate = () => {
    setForm(emptyForm)
    modal.openCreate()
  }

  const openEdit = (item: AdminService) => {
    setForm({
      title: item.title,
      summary: item.summary,
      description: item.description,
      features: item.features.join('\n'),
      active: item.active,
      sortOrder: item.sortOrder,
    })
    modal.openEdit(item)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = {
        title: form.title,
        summary: form.summary,
        description: form.description,
        features: form.features.split('\n').map((f) => f.trim()).filter(Boolean),
        active: form.active,
        sortOrder: form.sortOrder,
      }
      if (modal.isEditing && modal.editingItem) {
        await mockApi.updateService(modal.editingItem.id, payload)
      } else {
        await mockApi.createService(payload)
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
      await mockApi.deleteService(deleteId)
      setDeleteId(null)
      list.refresh()
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div>
      <AdminPageHeader title="Services Management" description="Configure services shown on the public website." />

      <TableCard
        search={list.search}
        onSearchChange={list.setSearch}
        onAdd={openCreate}
        addLabel="Add service"
        onReset={list.resetFilters}
        page={list.page}
        totalPages={list.totalPages}
        total={list.total}
        onPageChange={list.goToPage}
        filters={
          <FilterSelect
            label="Status"
            value={list.statusFilter}
            onChange={list.setStatusFilter}
            options={activeOptions}
          />
        }
      >
        <DataTable<AdminService>
          rowKey={(r) => r.id}
          loading={list.loading}
          columns={[
            { key: 'order', header: '#', render: (r) => r.sortOrder },
            { key: 'title', header: 'Title', render: (r) => <span className="font-medium text-slate-900">{r.title}</span> },
            { key: 'summary', header: 'Summary', className: 'max-w-xs', render: (r) => <span className="line-clamp-1">{r.summary}</span> },
            {
              key: 'active',
              header: 'Status',
              render: (r) => (
                <Badge label={r.active ? 'active' : 'inactive'} variant={r.active ? 'active' : 'inactive'} />
              ),
            },
          ]}
          data={list.data}
          actions={(row) => (
            <RowActions onEdit={() => openEdit(row)} onDelete={() => setDeleteId(row.id)} />
          )}
        />
      </TableCard>

      <Modal isOpen={modal.isOpen} onClose={modal.close} title={modal.isEditing ? 'Edit service' : 'Add service'} size="xl">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminInput label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            <AdminInput
              label="Sort order"
              type="number"
              value={form.sortOrder}
              onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
              required
            />
          </div>
          <AdminInput label="Summary" value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} required />
          <AdminTextarea label="Description" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
          <AdminTextarea
            label="Features (one per line)"
            rows={4}
            value={form.features}
            onChange={(e) => setForm({ ...form, features: e.target.value })}
            required
          />
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
              className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            />
            Active on website
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
        title="Delete service"
        message="This service will be removed from the website."
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}
