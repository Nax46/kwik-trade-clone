import { Menu, X } from 'lucide-react'
import { useCallback, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock'
import { useCloseOnEscape } from '../../hooks/useCloseOnEscape'
import { useCloseOnRouteChange } from '../../hooks/useCloseOnRouteChange'
import { COMPANY, mainNavLinks } from '../../data/siteContent'
import { Button } from '../ui/Button'
import { MobileMenu } from './MobileMenu'

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeMobile = useCallback(() => setMobileOpen(false), [])

  useBodyScrollLock(mobileOpen)
  useCloseOnEscape(mobileOpen, closeMobile)
  useCloseOnRouteChange(closeMobile)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="section-container flex h-16 items-center justify-between gap-3">
        <Link
          to="/"
          className="flex min-w-0 shrink-0 items-center gap-2.5"
          onClick={closeMobile}
        >
          <img
            src="/logo.svg"
            alt={`${COMPANY.shortName} logo`}
            className="h-9 w-9 rounded-xl shadow-soft"
            width={36}
            height={36}
          />
          <span className="hidden truncate text-lg font-semibold tracking-tight text-slate-900 sm:inline">
            {COMPANY.shortName}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {mainNavLinks.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `rounded-lg px-3.5 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                  isActive
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button to="/consultation" variant="outline" size="sm">
            Book consultation
          </Button>
          <Button to="/contact" size="sm">
            Contact
          </Button>
        </div>

        <button
          type="button"
          className="touch-target inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 active:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-menu"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <MobileMenu isOpen={mobileOpen} onClose={closeMobile} />
    </header>
  )
}
