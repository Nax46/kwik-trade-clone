import type { SelectHTMLAttributes } from 'react'
import type { FieldError } from 'react-hook-form'

type FormSelectProps = {
  label: string
  id: string
  error?: FieldError
  children: React.ReactNode
} & SelectHTMLAttributes<HTMLSelectElement>

export function FormSelect({
  label,
  id,
  error,
  children,
  className = '',
  ...props
}: FormSelectProps) {
  const hasError = Boolean(error?.message)

  return (
    <div>
      <label htmlFor={id} className="label-base">
        {label}
      </label>
      <select
        id={id}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${id}-error` : undefined}
        className={`input-base ${hasError ? 'input-base-error' : ''} ${className}`.trim()}
        {...props}
      >
        {children}
      </select>
      {hasError && (
        <p id={`${id}-error`} role="alert" className="error-text">
          {error?.message}
        </p>
      )}
    </div>
  )
}
