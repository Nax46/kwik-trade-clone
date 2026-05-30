import { motion } from 'framer-motion'

type SectionHeaderProps = {
  label: string
  title: string
  description?: string
  id?: string
}

export function SectionHeader({ label, title, description, id }: SectionHeaderProps) {
  return (
    <motion.div
      id={id}
      className="mx-auto max-w-2xl text-center"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">
        {label}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>
      )}
    </motion.div>
  )
}
