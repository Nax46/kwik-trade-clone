import { Bell, LogOut, Menu } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { useAdminAuth } from '../../../context/AdminAuthContext'
import { adminNavItems } from '../../config/nav'

type AdminTopbarProps = {
  onMenuClick: () => void
}

export function AdminTopbar({ onMenuClick }: AdminTopbarProps) {
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
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <p className="text-xs font-medium text-slate-400">TradeWithManish Admin</p>
          <h1 className="text-lg font-semibold text-slate-900">{current?.label ?? 'Dashboard'}</h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="relative rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2.5 rounded-lg border border-slate-200 py-1.5 pl-1.5 pr-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-100 text-sm font-semibold text-brand-700">
            {initials ?? 'AD'}
          </span>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-slate-900">{user?.name}</p>
            <p className="text-xs text-slate-500">{user?.email}</p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Log out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  )
}
