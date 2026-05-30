import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

type AuthBackButtonProps = {
  to?: string
  label?: string
}

export function AuthBackButton({ to = '/', label = 'Back to home' }: AuthBackButtonProps) {
  return (
    <Link
      to={to}
      className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-white"
    >
      <ArrowLeft className="h-4 w-4" aria-hidden />
      {label}
    </Link>
  )
}
