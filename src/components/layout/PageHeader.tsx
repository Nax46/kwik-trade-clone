import { motion } from 'framer-motion'

type PageHeaderProps = {
  label?: string
  title: string
  description?: string
}

export function PageHeader({ label, title, description }: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-brand-50/50 to-white py-12 sm:py-16">
      <div className="pointer-events-none absolute inset-0 bg-mesh-light opacity-70" aria-hidden />
      <motion.div
        className="section-container relative"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {label && (
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">{label}</p>
        )}
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">{description}</p>
        )}
      </motion.div>
    </div>
  )
}
