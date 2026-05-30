import { AlertCircle, CheckCircle2 } from 'lucide-react'

type AuthAlertProps = {
  variant: 'error' | 'success'
  message: string
}

export function AuthAlert({ variant, message }: AuthAlertProps) {
  const isError = variant === 'error'

  return (
    <div
      role="alert"
      className={`flex items-start gap-2.5 rounded-xl border px-4 py-3 text-sm ${
        isError
          ? 'border-danger/40 bg-danger/10 text-red-200'
          : 'border-accent/40 bg-accent/10 text-emerald-200'
      }`}
    >
      {isError ? (
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-danger" aria-hidden />
      ) : (
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
      )}
      <p>{message}</p>
    </div>
  )
}
