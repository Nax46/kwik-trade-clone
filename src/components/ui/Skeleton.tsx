type SkeletonProps = {
  className?: string
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-white/10 ${className}`.trim()}
      aria-hidden
    />
  )
}

export function StatCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-surface-raised p-5">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="mt-3 h-8 w-32" />
      <Skeleton className="mt-3 h-4 w-16" />
    </div>
  )
}

export function ChartCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-surface-raised p-5 sm:p-6">
      <Skeleton className="h-5 w-40" />
      <Skeleton className="mt-2 h-4 w-56" />
      <Skeleton className="mt-6 h-56 w-full sm:h-64" />
    </div>
  )
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface-raised">
      <div className="border-b border-border p-4 sm:p-5">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="mt-2 h-4 w-48" />
      </div>
      <div className="divide-y divide-border">
        {Array.from({ length: rows }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 p-4 sm:grid sm:grid-cols-4 sm:items-center sm:gap-4 sm:px-5"
          >
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
    </div>
  )
}
