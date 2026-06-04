import { Skeleton } from './Skeleton'

export function StatCardSkeleton() {
  return (
    <div className="card-surface p-6 text-center sm:p-8">
      <Skeleton className="mx-auto h-10 w-28" />
      <Skeleton className="mx-auto mt-3 h-4 w-36" />
    </div>
  )
}
