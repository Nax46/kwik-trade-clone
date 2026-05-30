import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { SectionHeader } from './SectionHeader'

const testimonials = [
  {
    id: '1',
    name: 'Priya Sharma',
    role: 'New learner',
    initials: 'PS',
    review:
      'The beginner lessons finally made candlesticks and risk management click for me. I feel more prepared before placing any trade.',
  },
  {
    id: '2',
    name: 'James Miller',
    role: 'Part-time trader',
    initials: 'JM',
    review:
      'Daily market insights are concise and practical. I use them to plan my week instead of chasing random social media tips.',
  },
  {
    id: '3',
    name: 'Aisha Khan',
    role: 'Finance student',
    initials: 'AK',
    review:
      'The blog articles explain concepts with real examples. It is the best free resource I have found for structured trading education.',
  },
]

export function Testimonials() {
  return (
    <section className="border-t border-border bg-surface-raised/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Community"
          title="Learners sharing their progress"
          description="Real feedback from people using our guides and market insights."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.blockquote
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel rounded-2xl p-6"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">&ldquo;{item.review}&rdquo;</p>
              <footer className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-sm font-semibold text-accent">
                  {item.initials}
                </span>
                <div>
                  <cite className="not-italic font-semibold text-white">{item.name}</cite>
                  <p className="text-xs text-muted">{item.role}</p>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
