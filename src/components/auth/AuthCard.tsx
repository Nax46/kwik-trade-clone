import type { ReactNode } from 'react'

type AuthCardProps = {
  title: string
  description: string
  children: ReactNode
  footer?: ReactNode
}

export function AuthCard({ title, description, children, footer }: AuthCardProps) {
  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-border bg-surface-raised/80 p-6 shadow-card backdrop-blur-sm sm:p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white">{title}</h1>
          <p className="mt-2 text-sm text-muted">{description}</p>
        </div>
        {children}
      </div>
      {footer}
    </div>
  )
}
