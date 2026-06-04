import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Star } from 'lucide-react'
import { COMPANY } from '../../data/siteContent'
import { Button } from '../ui/Button'

const highlights = [
  'Beginner-friendly trading education',
  'Daily market analysis & insights',
  '1-on-1 mentorship & consultation',
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/60 via-white to-white pb-16 pt-14 sm:pb-24 sm:pt-20">
      <div className="pointer-events-none absolute inset-0 bg-mesh-light" aria-hidden />
      <div className="section-container relative">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-semibold text-brand-700 shadow-sm">
              <Star className="h-3.5 w-3.5 fill-brand-500 text-brand-500" aria-hidden />
              {COMPANY.name}
            </span>
            <h1 className="mt-5 text-[1.75rem] font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem]">
              {COMPANY.tagline}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              {COMPANY.description}
            </p>
            <ul className="mt-7 space-y-2.5">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-slate-700 sm:text-base">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-600" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Button to="/consultation" size="lg" className="w-full sm:w-auto">
                Book free consultation
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" to="/services" className="w-full sm:w-auto">
                Explore services
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <div className="card-surface overflow-hidden shadow-elevated">
              <div className="bg-gradient-to-br from-brand-600 to-indigo-700 px-6 py-8 text-center text-white">
                <img
                  src="/logo.svg"
                  alt="TradeWithManish"
                  className="mx-auto h-32 w-32 sm:h-40 sm:w-40"
                  width={160}
                  height={160}
                />
                <p className="mt-4 text-lg font-semibold">Learn. Analyze. Trade with discipline.</p>
              </div>
              <div className="grid grid-cols-3 divide-x divide-slate-100 border-t border-slate-100 bg-white text-center">
                <div className="px-2 py-4">
                  <p className="text-lg font-bold text-brand-600">1.2k+</p>
                  <p className="text-xs text-slate-500">Learners</p>
                </div>
                <div className="px-2 py-4">
                  <p className="text-lg font-bold text-brand-600">Daily</p>
                  <p className="text-xs text-slate-500">Insights</p>
                </div>
                <div className="px-2 py-4">
                  <p className="text-lg font-bold text-brand-600">1:1</p>
                  <p className="text-xs text-slate-500">Mentorship</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
