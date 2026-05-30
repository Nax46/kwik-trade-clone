import { motion } from 'framer-motion'
import { ArrowRight, BarChart3, LineChart } from 'lucide-react'
import { Button } from '../ui/Button'

export function EducationHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-hero-radial" />
        <div className="absolute inset-0 bg-hero-blue" />
        <div className="absolute inset-0 bg-grid-fade bg-grid opacity-50" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6 sm:pb-28 sm:pt-20 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent"
            >
              <LineChart className="h-3.5 w-3.5" />
              Trading education & market insights
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Learn trading with clarity.{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-trade bg-clip-text text-transparent">
                Understand markets with confidence.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted lg:mx-0"
            >
              Beginner-friendly lessons, daily market updates, and practical guides — built for
              learners who want information, not hype.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
            >
              <Button to="/learn" size="lg">
                Start learning
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button to="/market-insights" variant="outline" size="lg">
                View market insights
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="relative mx-auto w-full max-w-lg"
          >
            <div className="glass-panel animate-float rounded-2xl p-1 shadow-card">
              <div className="rounded-xl border border-border bg-surface-overlay p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted">Market overview</p>
                    <p className="mt-1 font-mono text-2xl font-semibold text-white">Educational snapshot</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-accent" />
                </div>
                <div className="h-40 overflow-hidden rounded-lg bg-gradient-to-t from-accent/20 via-sky-500/10 to-transparent">
                  <svg viewBox="0 0 400 140" className="h-full w-full" preserveAspectRatio="none" aria-hidden>
                    <path
                      d="M0,110 Q80,90 160,95 T320,45 L400,35"
                      fill="none"
                      stroke="rgb(34, 211, 238)"
                      strokeWidth="2.5"
                    />
                    <path
                      d="M0,110 Q80,90 160,95 T320,45 L400,35 L400,140 L0,140 Z"
                      fill="url(#eduFill)"
                      opacity="0.35"
                    />
                    <defs>
                      <linearGradient id="eduFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgb(34, 211, 238)" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-4 text-center">
                  {[
                    ['Forex', 'Trend watch'],
                    ['Gold', 'Key levels'],
                    ['Stocks', 'Sector notes'],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <p className="text-[10px] uppercase tracking-wider text-muted">{label}</p>
                      <p className="mt-0.5 text-xs font-medium text-slate-200">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -right-2 top-8 hidden rounded-xl border border-border glass-panel px-3 py-2 sm:block"
            >
              <p className="text-[10px] text-muted">Beginner path</p>
              <p className="text-sm font-medium text-trade">Risk basics</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
