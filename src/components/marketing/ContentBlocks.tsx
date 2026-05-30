import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

type SectionIntroProps = {
  eyebrow?: string
  title: string
  description: string
}

export function SectionIntro({ eyebrow, title, description }: SectionIntroProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{eyebrow}</p>
      )}
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{description}</p>
    </div>
  )
}

type FeatureCard = {
  icon: LucideIcon
  title: string
  description: string
}

export function FeatureGrid({ items }: { items: FeatureCard[] }) {
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(({ icon: Icon, title, description }, index) => (
        <motion.article
          key={title}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: index * 0.06 }}
          className="rounded-2xl border border-border bg-surface-raised/80 p-5 backdrop-blur-sm"
        >
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="mt-4 text-base font-semibold text-white">{title}</h3>
          <p className="mt-2 text-sm text-muted">{description}</p>
        </motion.article>
      ))}
    </div>
  )
}

type FAQItem = {
  question: string
  answer: string
}

export function FAQList({ items }: { items: FAQItem[] }) {
  return (
    <div className="mt-10 space-y-3">
      {items.map((item) => (
        <article key={item.question} className="rounded-xl border border-border bg-surface-raised p-5">
          <h3 className="text-base font-semibold text-white">{item.question}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{item.answer}</p>
        </article>
      ))}
    </div>
  )
}

export function CTASection({
  title,
  description,
  action,
}: {
  title: string
  description: string
  action: ReactNode
}) {
  return (
    <section className="py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-accent/30 bg-gradient-to-r from-accent/10 via-surface-raised to-surface p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted sm:text-base">{description}</p>
          <div className="mt-6">{action}</div>
        </div>
      </div>
    </section>
  )
}
