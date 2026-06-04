import { TrendingUp, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { COMPANY } from '../../../data/siteContent'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { adminNavItems } from '../../config/nav'

type AdminSidebarProps = {
  open: boolean
  onClose: () => void
}

export function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ease-out lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden={!open}
      />

      <aside
        id="admin-sidebar"
        aria-label="Admin sidebar"
        aria-hidden={!isDesktop && !open}
        className={`fixed inset-y-0 left-0 z-50 flex w-[min(100%,280px)] flex-col border-r border-slate-200 bg-white shadow-elevated transition-transform duration-300 ease-out lg:static lg:z-auto lg:w-64 lg:translate-x-0 lg:shadow-none ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 px-4">
          <NavLink to="/admin" className="flex items-center gap-2.5" onClick={onClose}>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-indigo-600 text-white">
              <TrendingUp className="h-4 w-4" aria-hidden />
            </span>
            <div>
              <span className="block text-sm font-bold text-slate-900">{COMPANY.shortName}</span>
              <span className="block text-[10px] font-medium uppercase tracking-wider text-slate-400">
                Admin
              </span>
            </div>
          </NavLink>
          <button
            type="button"
            onClick={onClose}
            className="touch-target rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto overscroll-contain p-3" aria-label="Admin navigation">
          {adminNavItems.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/admin'}
              onClick={onClose}
              className={({ isActive }) =>
                `flex min-h-[44px] items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 ring-1 ring-brand-100'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              <Icon className="h-5 w-5 shrink-0" aria-hidden />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="shrink-0 border-t border-slate-100 p-4">
          <NavLink
            to="/"
            className="flex min-h-[44px] items-center justify-center rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            onClick={onClose}
          >
            View website
          </NavLink>
        </div>
      </aside>
    </>
  )
}
