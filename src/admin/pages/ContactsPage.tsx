import { Loader2 } from 'lucide-react'
import { useCallback, useState } from 'react'
import { AdminInput } from '../components/ui/AdminInput'
import { AdminSelect } from '../components/ui/AdminSelect'
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
import type { ContactRequest, EntityStatus } from '../types'
import { formatDate } from '../utils/format'

const statusOptions = [
  { value: '', label: 'All statuses' },
  { value: 'new', label: 'New' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'archived', label: 'Archived' },
]

const emptyContact = {
  fullName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  status: 'new' as EntityStatus,
}

export function ContactsPage() {
  const list = usePaginatedList(useCallback((p) => mockApi.listContacts(p), []))
  const modal = useModal<ContactRequest>()
  const [form, setForm] = useState(emptyContact)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const openCreate = () => {
    setForm(emptyContact)
    modal.openCreate()
  }

  const openEdit = (item: ContactRequest) => {
    setForm({
      fullName: item.fullName,
      email: item.email,
      phone: item.phone,
      subject: item.subject,
      message: item.message,
      status: item.status,
    })
    modal.openEdit(item)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (modal.isEditing && modal.editingItem) {
        await mockApi.updateContact(modal.editingItem.id, form)
      } else {
        await mockApi.createContact(form)
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
      await mockApi.deleteContact(deleteId)
      setDeleteId(null)
      list.refresh()
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div>
      <AdminPageHeader
        title="Contact Requests"
        description="Messages submitted through the public contact form."
      />

      <TableCard
        search={list.search}
        onSearchChange={list.setSearch}
        searchPlaceholder="Search contacts…"
        onAdd={openCreate}
        addLabel="Add request"
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
            options={statusOptions}
          />
        }
      >
        <DataTable<ContactRequest>
          rowKey={(r) => r.id}
          mobileTitle={(r) => r.fullName}
          loading={list.loading}
          columns={[
            {
              key: 'name',
              header: 'Name',
              hideOnMobile: true,
              render: (r) => <span className="font-medium text-slate-900">{r.fullName}</span>,
            },
            { key: 'subject', header: 'Subject', render: (r) => r.subject },
            { key: 'email', header: 'Email', render: (r) => r.email },
            {
              key: 'status',
              header: 'Status',
              render: (r) => <Badge label={r.status} variant={r.status} />,
            },
            { key: 'date', header: 'Received', render: (r) => formatDate(r.createdAt) },
          ]}
          data={list.data}
          actions={(row) => (
            <RowActions onEdit={() => openEdit(row)} onDelete={() => setDeleteId(row.id)} />
          )}
        />
      </TableCard>

      <Modal
        isOpen={modal.isOpen}
        onClose={modal.close}
        title={modal.isEditing ? 'Edit contact request' : 'Add contact request'}
        size="xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminInput label="Full name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
            <AdminInput label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <AdminInput label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
            <AdminSelect
              label="Status"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as EntityStatus })}
              options={statusOptions.filter((o) => o.value)}
            />
          </div>
          <AdminInput label="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
          <AdminTextarea label="Message" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
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
        title="Delete contact request"
        message="This contact request will be permanently removed."
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}
