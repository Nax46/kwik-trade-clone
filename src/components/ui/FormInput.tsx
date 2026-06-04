import type { InputHTMLAttributes } from 'react'
import type { FieldError } from 'react-hook-form'

type FormInputProps = {
  label: string
  id: string
  error?: FieldError
  hint?: string
} & InputHTMLAttributes<HTMLInputElement>

export function FormInput({ label, id, error, hint, className = '', ...props }: FormInputProps) {
  const hasError = Boolean(error?.message)

  return (
    <div>
      <label htmlFor={id} className="label-base">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={`input-base ${hasError ? 'input-base-error' : ''} ${className}`.trim()}
        {...props}
      />
      {hint && !hasError && (
        <p id={`${id}-hint`} className="hint-text">
          {hint}
        </p>
      )}
      {hasError && (
        <p id={`${id}-error`} role="alert" className="error-text">
          {error?.message}
        </p>
      )}
    </div>
  )
}
