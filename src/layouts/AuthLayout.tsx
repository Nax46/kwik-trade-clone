import { Link, Outlet } from 'react-router-dom'
import { BookOpen } from 'lucide-react'

export function AuthLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-surface">
      <header className="border-b border-border px-4 py-4 sm:px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-lg font-semibold text-white"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent">
            <BookOpen className="h-5 w-5" aria-hidden />
          </span>
          Kwik Trade
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center overflow-y-auto px-4 py-8 sm:py-12">
        <Outlet />
      </main>
    </div>
  )
}
