import type { ReactNode } from 'react'
import { Check } from 'lucide-react'

type SelectionCardProps = {
  selected: boolean
  onSelect: () => void
  title: string
  description?: string
  icon?: ReactNode
  disabled?: boolean
}

export function SelectionCard({
  selected,
  onSelect,
  title,
  description,
  icon,
  disabled,
}: SelectionCardProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onSelect}
      aria-pressed={selected}
      className={`selection-card w-full ${selected ? 'selection-card-selected' : 'selection-card-unselected'} disabled:opacity-50`}
    >
      <div className="flex items-start gap-3">
        {icon && (
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
              selected ? 'bg-brand-600 text-white' : 'bg-brand-50 text-brand-600'
            }`}
          >
            {icon}
          </span>
        )}
        <div className="min-w-0 flex-1 text-left">
          <span className="block font-semibold text-slate-900">{title}</span>
          {description && (
            <span className="mt-1 block text-sm text-slate-600">{description}</span>
          )}
        </div>
        {selected && (
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
            <Check className="h-3.5 w-3.5" aria-hidden />
          </span>
        )}
      </div>
    </button>
  )
}
