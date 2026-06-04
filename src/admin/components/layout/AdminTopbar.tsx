import { Bell, LogOut, Menu } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { useAdminAuth } from '../../../context/AdminAuthContext'
import { adminNavItems } from '../../config/nav'

type AdminTopbarProps = {
  onMenuClick: () => void
  sidebarOpen?: boolean
}

export function AdminTopbar({ onMenuClick, sidebarOpen = false }: AdminTopbarProps) {
  const { pathname } = useLocation()
  const { user, logout } = useAdminAuth()
  const current = adminNavItems.find(
    (item) => pathname === item.to || (item.to !== '/admin' && pathname.startsWith(item.to)),
  )

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <header className="sticky top-0 z-30 flex min-h-16 shrink-0 items-center justify-between gap-2 border-b border-slate-200 bg-white/95 px-3 backdrop-blur sm:gap-4 sm:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="shrink-0 rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 lg:hidden"
          aria-label="Open menu"
          aria-controls="admin-sidebar"
          aria-expanded={sidebarOpen}
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="min-w-0">
          <p className="truncate text-[10px] font-medium text-slate-400 sm:text-xs">
            TradeWithManish Admin
          </p>
          <h1 className="truncate text-base font-semibold text-slate-900 sm:text-lg">
            {current?.label ?? 'Dashboard'}
          </h1>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
        <button
          type="button"
          className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </button>
        <div className="flex max-w-[min(100%,200px)] items-center gap-1.5 rounded-lg border border-slate-200 py-1 pl-1 pr-1 sm:max-w-none sm:gap-2.5 sm:py-1.5 sm:pl-1.5 sm:pr-2">
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-100 text-xs font-semibold text-brand-700 sm:text-sm"
            aria-hidden
          >
            {initials ?? 'AD'}
          </span>
          <div className="hidden min-w-0 sm:block">
            <p className="truncate text-sm font-medium text-slate-900">{user?.name}</p>
            <p className="truncate text-xs text-slate-500">{user?.email}</p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="shrink-0 rounded-lg p-2 text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            aria-label="Log out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  )
}
