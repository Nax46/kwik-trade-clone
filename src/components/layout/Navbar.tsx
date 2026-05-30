import { AnimatePresence, motion } from 'framer-motion'
import { BookOpen, ChevronDown, Menu, Search, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { mainNavLinks, moreNavLinks } from '../../config/siteNav'
import { Button } from '../ui/Button'

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const moreRef = useRef<HTMLDivElement>(null)

  const closeMobile = () => setMobileOpen(false)

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-surface/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2.5 text-white"
          onClick={closeMobile}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent ring-1 ring-accent/30">
            <BookOpen className="h-5 w-5" aria-hidden />
          </span>
          <span className="hidden text-lg font-semibold tracking-tight sm:inline">
            Kwik Trade
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {mainNavLinks.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive ? 'bg-accent/10 text-accent' : 'text-muted hover:bg-white/5 hover:text-white'
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          <div ref={moreRef} className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen((open) => !open)}
              className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-white/5 hover:text-white"
              aria-expanded={moreOpen}
            >
              More
              <ChevronDown className={`h-4 w-4 transition ${moreOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {moreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-border glass-panel p-2 shadow-glass"
                >
                  {moreNavLinks.map(({ label, to }) => (
                    <NavLink
                      key={to}
                      to={to}
                      onClick={() => setMoreOpen(false)}
                      className={({ isActive }) =>
                        `block rounded-lg px-3 py-2 text-sm ${
                          isActive ? 'bg-accent/10 text-accent' : 'text-slate-300 hover:bg-white/5'
                        }`
                      }
                    >
                      {label}
                    </NavLink>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <div className="relative">
            <button
              type="button"
              aria-label="Search"
              onClick={() => setSearchOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted transition hover:border-accent/40 hover:text-accent"
            >
              <Search className="h-4 w-4" />
            </button>
            <AnimatePresence>
              {searchOpen && (
                <motion.input
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  type="search"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="absolute right-0 top-0 h-10 rounded-lg border border-border bg-surface-overlay px-3 text-sm text-white placeholder:text-slate-500 focus:border-accent/50 focus:outline-none"
                />
              )}
            </AnimatePresence>
          </div>
          <NavLink
            to="/login"
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:text-white"
          >
            Login
          </NavLink>
          <Button to="/register" size="sm">
            Get Started
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-slate-300 transition hover:bg-white/5 lg:hidden"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-16 z-40 bg-black/60 lg:hidden"
              onClick={closeMobile}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed right-0 top-16 z-50 h-[calc(100vh-4rem)] w-[min(100%,320px)] border-l border-border glass-panel lg:hidden"
            >
              <nav className="flex h-full flex-col gap-1 overflow-y-auto p-4" aria-label="Mobile navigation">
                {mainNavLinks.map(({ label, to }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={to === '/'}
                    onClick={closeMobile}
                    className={({ isActive }) =>
                      `rounded-lg px-3 py-2.5 text-sm font-medium ${
                        isActive ? 'bg-accent/15 text-accent' : 'text-slate-300 hover:bg-white/5'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                ))}
                <p className="mt-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted">More</p>
                {moreNavLinks.map(({ label, to }) => (
                  <NavLink
                    key={to}
                    to={to}
                    onClick={closeMobile}
                    className="rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-white/5"
                  >
                    {label}
                  </NavLink>
                ))}
                <hr className="my-3 border-border" />
                <NavLink
                  to="/login"
                  onClick={closeMobile}
                  className="rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-white/5"
                >
                  Login
                </NavLink>
                <Button to="/register" className="mt-2 w-full" onClick={closeMobile}>
                  Get Started
                </Button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
