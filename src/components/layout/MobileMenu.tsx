import { AnimatePresence, motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { mainNavLinks } from '../../data/siteContent'
import { Button } from '../ui/Button'

type MobileMenuProps = {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-16 z-40 bg-slate-900/20 backdrop-blur-sm lg:hidden"
            onClick={onClose}
            aria-hidden
          />
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="fixed right-0 top-16 z-50 flex h-[calc(100dvh-4rem)] w-full max-w-[min(100%,320px)] flex-col border-l border-slate-200 bg-white shadow-elevated lg:hidden"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
              {mainNavLinks.map(({ label, to }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `min-h-[44px] rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? 'bg-brand-50 text-brand-700'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>
            <div className="space-y-2 border-t border-slate-200 p-4">
              <Button to="/consultation" className="w-full" onClick={onClose}>
                Book consultation
              </Button>
              <Button to="/contact" variant="outline" className="w-full" onClick={onClose}>
                Contact us
              </Button>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}
