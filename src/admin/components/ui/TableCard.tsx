import type { ReactNode } from 'react'
import { Pagination } from './Pagination'
import { TableToolbar } from './TableToolbar'

type TableCardProps = {
  search: string
  onSearchChange: (value: string) => void
  searchPlaceholder?: string
  onAdd?: () => void
  addLabel?: string
  onReset?: () => void
  filters?: ReactNode
  page: number
  totalPages: number
  total: number
  onPageChange: (page: number) => void
  children: ReactNode
}

export function TableCard({
  search,
  onSearchChange,
  searchPlaceholder,
  onAdd,
  addLabel,
  onReset,
  filters,
  page,
  totalPages,
  total,
  onPageChange,
  children,
}: TableCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <TableToolbar
        search={search}
        onSearchChange={onSearchChange}
        searchPlaceholder={searchPlaceholder}
        onAdd={onAdd}
        addLabel={addLabel}
        onReset={onReset}
        filters={filters}
      />
      {children}
      <Pagination page={page} totalPages={totalPages} total={total} onPageChange={onPageChange} />
    </div>
  )
}
