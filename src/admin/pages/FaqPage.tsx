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
import type { FaqItem } from '../types'

const publishedOptions = [
  { value: '', label: 'All' },
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
]

const emptyForm = { question: '', answer: '', published: true, sortOrder: 1 }

export function FaqPage() {
  const list = usePaginatedList(useCallback((p) => mockApi.listFaqs(p), []))
  const modal = useModal<FaqItem>()
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const openCreate = () => {
    setForm(emptyForm)
    modal.openCreate()
  }

  const openEdit = (item: FaqItem) => {
    setForm({
      question: item.question,
      answer: item.answer,
      published: item.published,
      sortOrder: item.sortOrder,
    })
    modal.openEdit(item)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (modal.isEditing && modal.editingItem) {
        await mockApi.updateFaq(modal.editingItem.id, form)
      } else {
        await mockApi.createFaq(form)
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
      await mockApi.deleteFaq(deleteId)
      setDeleteId(null)
      list.refresh()
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div>
      <AdminPageHeader title="FAQ Management" description="Manage frequently asked questions on the public FAQ page." />

      <TableCard
        search={list.search}
        onSearchChange={list.setSearch}
        onAdd={openCreate}
        addLabel="Add FAQ"
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
        <DataTable<FaqItem>
          rowKey={(r) => r.id}
          loading={list.loading}
          columns={[
            { key: 'order', header: '#', render: (r) => r.sortOrder },
            {
              key: 'question',
              header: 'Question',
              render: (r) => <span className="font-medium text-slate-900">{r.question}</span>,
            },
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

      <Modal isOpen={modal.isOpen} onClose={modal.close} title={modal.isEditing ? 'Edit FAQ' : 'Add FAQ'} size="lg">
        <form onSubmit={handleSave} className="space-y-4">
          <AdminInput
            label="Sort order"
            type="number"
            value={form.sortOrder}
            onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
            required
          />
          <AdminInput label="Question" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} required />
          <AdminTextarea label="Answer" rows={5} value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} required />
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
        title="Delete FAQ"
        message="This FAQ item will be removed from the website."
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}
