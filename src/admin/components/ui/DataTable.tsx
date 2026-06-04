import { Loader2 } from 'lucide-react'
import type { ReactNode } from 'react'
import { EmptyState } from '../../../components/ui/EmptyState'
import { MobileRecordCard } from './MobileRecordCard'

export type Column<T> = {
  key: string
  header: string
  render: (row: T) => ReactNode
  className?: string
  /** Hide this field on mobile card layout */
  hideOnMobile?: boolean
}

type DataTableProps<T> = {
  columns: Column<T>[]
  data: T[]
  loading?: boolean
  emptyMessage?: string
  emptyTitle?: string
  rowKey: (row: T) => string
  actions?: (row: T) => ReactNode
  /** Optional primary label for mobile card header */
  mobileTitle?: (row: T) => ReactNode
}

export function DataTable<T>({
  columns,
  data,
  loading,
  emptyMessage = 'No records found.',
  emptyTitle = 'Nothing here yet',
  rowKey,
  actions,
  mobileTitle,
}: DataTableProps<T>) {
  const colSpan = columns.length + (actions ? 1 : 0)
  const mobileColumns = columns.filter((c) => !c.hideOnMobile)

  const emptyContent = (
    <EmptyState compact title={emptyTitle} description={emptyMessage} />
  )

  const loadingContent = (
    <div className="flex flex-col items-center justify-center py-16">
      <Loader2 className="h-8 w-8 animate-spin text-brand-600" aria-hidden />
      <p className="mt-2 text-sm text-slate-500">Loading…</p>
    </div>
  )

  return (
    <div className="admin-card overflow-hidden">
      {/* Desktop table */}
      <div className="hidden md:block">
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
                  {loadingContent}
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={colSpan} className="p-4 sm:p-6">
                  {emptyContent}
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

      {/* Mobile cards */}
      <div className="md:hidden">
        {loading ? (
          <div className="p-4">{loadingContent}</div>
        ) : data.length === 0 ? (
          <div className="p-4">{emptyContent}</div>
        ) : (
          <ul className="space-y-3 p-4" role="list">
            {data.map((row) => (
              <li key={rowKey(row)}>
                <MobileRecordCard
                  fields={mobileColumns.map((col) => ({
                    label: col.header,
                    value: col.render(row),
                  }))}
                  footer={actions?.(row)}
                >
                  {mobileTitle && (
                    <p className="mb-3 text-base font-semibold text-slate-900">
                      {mobileTitle(row)}
                    </p>
                  )}
                </MobileRecordCard>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
