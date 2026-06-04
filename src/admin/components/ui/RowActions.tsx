import { Pencil, Trash2 } from 'lucide-react'

type RowActionsProps = {
  onEdit: () => void
  onDelete: () => void
}

export function RowActions({ onEdit, onDelete }: RowActionsProps) {
  return (
    <>
      <button
        type="button"
        onClick={onEdit}
        className="touch-target rounded-lg p-2 text-slate-500 transition hover:bg-brand-50 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        aria-label="Edit"
      >
        <Pencil className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={onDelete}
        className="touch-target rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        aria-label="Delete"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </>
  )
}
