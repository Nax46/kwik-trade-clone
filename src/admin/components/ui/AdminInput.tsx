import type { InputHTMLAttributes } from 'react'

type AdminInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

export function AdminInput({ label, error, id, className = '', ...props }: AdminInputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div>
      <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={inputId}
        className={`input-base min-h-[44px] rounded-lg px-3 py-2 text-sm shadow-sm disabled:bg-slate-50 ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}
