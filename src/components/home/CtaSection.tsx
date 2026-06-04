import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '../ui/Button'

export function CtaSection() {
  return (
    <section className="section-spacing pt-0">
      <div className="section-container">
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-600 to-indigo-700 px-6 py-12 text-center shadow-elevated sm:px-16 sm:py-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]"
            aria-hidden
          />
          <div className="relative">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to level up your trading?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-brand-100 sm:text-base">
              Book a free consultation or send a message—we will respond within one business day.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Button
                to="/consultation"
                className="w-full bg-white text-brand-700 hover:bg-brand-50 hover:text-brand-800 sm:w-auto"
              >
                Book consultation
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                to="/contact"
                variant="outline"
                className="w-full border-white/40 text-white hover:border-white hover:bg-white/10 sm:w-auto"
              >
                Contact us
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
