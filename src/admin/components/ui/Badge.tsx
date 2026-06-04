const variants: Record<string, string> = {
  new: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  contacted: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  qualified: 'bg-indigo-50 text-indigo-700 ring-indigo-600/20',
  converted: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  lost: 'bg-slate-100 text-slate-600 ring-slate-500/20',
  in_progress: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  resolved: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  archived: 'bg-slate-100 text-slate-600 ring-slate-500/20',
  active: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  inactive: 'bg-slate-100 text-slate-600 ring-slate-500/20',
  published: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  draft: 'bg-slate-100 text-slate-600 ring-slate-500/20',
  closed: 'bg-slate-100 text-slate-600 ring-slate-500/20',
  pending: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  approved: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  rejected: 'bg-red-50 text-red-700 ring-red-600/20',
  completed: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
}

type BadgeProps = {
  label: string
  variant?: string
}

export function Badge({ label, variant }: BadgeProps) {
  const key = variant ?? label.toLowerCase().replace(/\s+/g, '_')
  const classes = variants[key] ?? 'bg-slate-100 text-slate-600 ring-slate-500/20'

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${classes}`}
    >
      {label.replace(/_/g, ' ')}
    </span>
  )
}
