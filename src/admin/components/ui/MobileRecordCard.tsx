import type { ReactNode } from 'react'

export type MobileRecordField = {
  label: string
  value: ReactNode
  className?: string
}

type MobileRecordCardProps = {
  children?: ReactNode
  fields: MobileRecordField[]
  footer?: ReactNode
  className?: string
}

export function MobileRecordCard({ fields, footer, children, className = '' }: MobileRecordCardProps) {
  return (
    <article
      className={`rounded-xl border border-slate-200 bg-white p-4 shadow-sm ${className}`}
    >
      {children}
      <dl className="space-y-3">
        {fields.map(({ label, value, className: fieldClass }) => (
          <div key={label} className={fieldClass}>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</dt>
            <dd className="mt-0.5 text-sm text-slate-800 break-words">{value}</dd>
          </div>
        ))}
      </dl>
      {footer && (
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
          {footer}
        </div>
      )}
    </article>
  )
}
