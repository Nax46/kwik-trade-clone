import type { LucideIcon } from 'lucide-react'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Skeleton } from '../../../components/ui/Skeleton'

type StatCardProps = {
  title: string
  value: string | number
  change?: number
  icon: LucideIcon
  loading?: boolean
  to?: string
}

export function StatCard({ title, value, change, icon: Icon, loading, to }: StatCardProps) {
  const positive = change !== undefined && change >= 0

  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          {loading ? (
            <Skeleton className="mt-2 h-8 w-24" />
          ) : (
            <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">{value}</p>
          )}
          {change !== undefined && !loading && (
            <p
              className={`mt-2 flex items-center gap-1 text-xs font-medium ${
                positive ? 'text-emerald-600' : 'text-red-600'
              }`}
            >
              {positive ? (
                <TrendingUp className="h-3.5 w-3.5" aria-hidden />
              ) : (
                <TrendingDown className="h-3.5 w-3.5" aria-hidden />
              )}
              {Math.abs(change)}% vs last month
            </p>
          )}
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-100 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.25)]">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
      </div>
    </>
  )

  const className =
    'admin-card group block w-full p-5 text-left transition duration-200 hover:scale-[1.02] hover:border-brand-300 hover:shadow-[0_8px_32px_-8px_rgba(37,99,235,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2'

  if (!to) {
    return <div className={className.replace('cursor-pointer', '')}>{content}</div>
  }

  return (
    <Link to={to} className={`${className} cursor-pointer`} aria-label={`${title}: view details`}>
      {content}
    </Link>
  )
}
