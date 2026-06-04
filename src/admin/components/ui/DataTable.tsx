import { Loader2 } from 'lucide-react'
import type { ReactNode } from 'react'
import { EmptyState } from '../../../components/ui/EmptyState'

export type Column<T> = {
  key: string
  header: string
  render: (row: T) => ReactNode
  className?: string
}

type DataTableProps<T> = {
  columns: Column<T>[]
  data: T[]
  loading?: boolean
  emptyMessage?: string
  emptyTitle?: string
  rowKey: (row: T) => string
  actions?: (row: T) => ReactNode
}

export function DataTable<T>({
  columns,
  data,
  loading,
  emptyMessage = 'No records found.',
  emptyTitle = 'Nothing here yet',
  rowKey,
  actions,
}: DataTableProps<T>) {
  const colSpan = columns.length + (actions ? 1 : 0)

  return (
    <div className="admin-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 sm:px-6 ${col.className ?? ''}`}
                >
                  {col.header}
                </th>
              ))}
              {actions && (
                <th
                  scope="col"
                  className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500 sm:px-6"
                >
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {loading ? (
              <tr>
                <td colSpan={colSpan} className="px-6 py-16 text-center">
                  <Loader2 className="mx-auto h-8 w-8 animate-spin text-brand-600" />
                  <p className="mt-2 text-sm text-slate-500">Loading…</p>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={colSpan} className="p-4 sm:p-6">
                  <EmptyState compact title={emptyTitle} description={emptyMessage} />
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={rowKey(row)} className="transition hover:bg-slate-50/80">
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`px-4 py-3.5 text-sm text-slate-700 sm:px-6 ${col.className ?? ''}`}
                    >
                      {col.render(row)}
                    </td>
                  ))}
                  {actions && (
                    <td className="whitespace-nowrap px-4 py-3.5 text-right text-sm sm:px-6">
                      <div className="flex justify-end gap-2">{actions(row)}</div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
