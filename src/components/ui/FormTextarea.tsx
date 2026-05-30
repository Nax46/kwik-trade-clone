import type { TextareaHTMLAttributes } from 'react'
import type { FieldError } from 'react-hook-form'

type FormTextareaProps = {
  label: string
  id: string
  error?: FieldError
  hint?: string
} & TextareaHTMLAttributes<HTMLTextAreaElement>

const baseClass =
  'w-full resize-y rounded-xl border bg-surface-overlay px-4 py-2.5 text-sm text-white placeholder:text-slate-500 transition focus:outline-none focus:ring-2 min-h-[120px]'

export function FormTextarea({
  label,
  id,
  error,
  hint,
  className = '',
  ...props
}: FormTextareaProps) {
  const hasError = Boolean(error?.message)
  const borderClass = hasError
    ? 'border-danger/60 focus:border-danger/60 focus:ring-danger/20'
    : 'border-border focus:border-accent/50 focus:ring-accent/20'

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-300">
        {label}
      </label>
      <textarea
        id={id}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={`${baseClass} ${borderClass} ${className}`.trim()}
        {...props}
      />
      {hint && !hasError && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-muted">
          {hint}
        </p>
      )}
      {hasError && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-danger">
          {error?.message}
        </p>
      )}
    </div>
  )
}
