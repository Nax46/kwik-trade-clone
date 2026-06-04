import type { LucideIcon } from 'lucide-react'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { Skeleton } from '../../../components/ui/Skeleton'

type StatCardProps = {
  title: string
  value: string | number
  change?: number
  icon: LucideIcon
  loading?: boolean
}

export function StatCard({ title, value, change, icon: Icon, loading }: StatCardProps) {
  const positive = change !== undefined && change >= 0

  return (
    <div className="admin-card p-5 transition hover:border-brand-200 hover:shadow-card">
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
                <TrendingUp className="h-3.5 w-3.5" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5" />
              )}
              {Math.abs(change)}% vs last month
            </p>
          )}
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
          <Icon className="h-5 w-5" />
        </span>
      </div>
    </div>
  )
}
