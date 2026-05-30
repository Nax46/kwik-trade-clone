import type { InputHTMLAttributes } from 'react'
import type { FieldError } from 'react-hook-form'

type FormCheckboxProps = {
  label: string
  id: string
  error?: FieldError
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

export function FormCheckbox({ label, id, error, className = '', ...props }: FormCheckboxProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-300"
      >
        <input
          id={id}
          type="checkbox"
          className={`h-4 w-4 rounded border-border bg-surface-overlay text-accent focus:ring-2 focus:ring-accent/30 focus:ring-offset-0 ${className}`}
          {...props}
        />
        {label}
      </label>
      {error?.message && (
        <p role="alert" className="mt-1.5 text-xs text-danger">
          {error.message}
        </p>
      )}
    </div>
  )
}
