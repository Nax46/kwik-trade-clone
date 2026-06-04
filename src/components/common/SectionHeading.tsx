import { motion } from 'framer-motion'

type SectionHeadingProps = {
  label: string
  title: string
  description?: string
  align?: 'center' | 'left'
}

export function SectionHeading({
  label,
  title,
  description,
  align = 'center',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl'

  return (
    <motion.div
      className={alignClass}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">{label}</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-slate-600">{description}</p>
      )}
    </motion.div>
  )
}
