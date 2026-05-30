import { motion } from 'framer-motion'
import {
  ArrowRight,
  Bitcoin,
  BookOpen,
  Brain,
  CandlestickChart,
  Coins,
  LineChart,
  Shield,
  Wrench,
} from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { EducationHero } from '../components/home/EducationHero'
import { FAQ } from '../components/home/FAQ'
import { SectionHeader } from '../components/home/SectionHeader'
import { Testimonials } from '../components/home/Testimonials'
import { Footer } from '../components/layout/Footer'
import { Button } from '../components/ui/Button'
import { Toast, type ToastState } from '../components/ui/Toast'
import { submitGenericForm } from '../services/form.service'

const marketHighlights = [
  { name: 'Gold', note: 'Safe-haven demand and inflation context drive weekly outlook.', icon: Coins, tone: 'text-amber-300' },
  { name: 'Bitcoin', note: 'Volatility remains elevated; focus on liquidity zones and risk sizing.', icon: Bitcoin, tone: 'text-orange-300' },
  { name: 'Forex', note: 'Major pairs reacting to rate expectations and economic data releases.', icon: LineChart, tone: 'text-cyan-300' },
  { name: 'Stocks', note: 'Sector rotation continues as earnings season shapes sentiment.', icon: CandlestickChart, tone: 'text-sky-300' },
]

const beginnerTopics = [
  { title: 'What is trading?', text: 'Understand markets, order types, and how price moves before risking capital.', icon: BookOpen },
  { title: 'Risk management', text: 'Learn position sizing, stop placement, and protecting your account first.', icon: Shield },
  { title: 'Market psychology', text: 'Control emotions, avoid revenge trading, and build disciplined routines.', icon: Brain },
  { title: 'Technical analysis', text: 'Read trends, support/resistance, and candlestick patterns with context.', icon: LineChart },
]

const latestInsights = [
  { title: 'Forex weekly briefing: USD strength in focus', category: 'Forex', description: 'Key levels and event risk for major pairs this week.' },
  { title: 'Gold outlook: inflation data and safe-haven flows', category: 'Gold', description: 'What learners should watch before the next session.' },
  { title: 'Stock market snapshot: earnings and sector leadership', category: 'Stocks', description: 'A beginner-friendly read on index momentum.' },
  { title: 'Crypto context: volatility and liquidity zones', category: 'Crypto', description: 'Educational notes on managing risk in fast markets.' },
]

const tradingTools = [
  'Position size calculator guide',
  'Economic calendar reading checklist',
  'Trade journal template',
  'Risk-reward planning worksheet',
  'Session prep routine',
  'Beginner glossary',
]

export function HomePage() {
  const [email, setEmail] = useState('')
  const [toast, setToast] = useState<ToastState | null>(null)

  const onNewsletterSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email.trim()) {
      setToast({ id: Date.now(), variant: 'error', message: 'Please enter your email.' })
      return
    }
    try {
      const response = await submitGenericForm({
        formType: 'Newsletter',
        fields: { email: email.trim() },
      })
      setToast({
        id: Date.now(),
        variant: response.success ? 'success' : 'error',
        message: response.message,
      })
      if (response.success) setEmail('')
    } catch {
      setToast({ id: Date.now(), variant: 'error', message: 'Unable to subscribe right now.' })
    }
  }

  return (
    <>
      <Toast toast={toast} onDismiss={() => setToast(null)} />
      <EducationHero />

      <section className="border-t border-border py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Markets"
            title="Market highlights"
            description="Informational snapshots to help you understand what is moving — not trade signals."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {marketHighlights.map(({ name, note, icon: Icon, tone }, index) => (
              <motion.article
                key={name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="glass-panel rounded-2xl p-5"
              >
                <Icon className={`h-6 w-6 ${tone}`} />
                <h3 className="mt-3 text-lg font-semibold text-white">{name}</h3>
                <p className="mt-2 text-sm text-muted">{note}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface-raised/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Beginner path"
            title="Start with the fundamentals"
            description="Structured learning cards designed for first-time traders."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {beginnerTopics.map(({ title, text, icon: Icon }, index) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="rounded-2xl border border-border bg-surface p-5 transition hover:border-accent/30"
              >
                <Icon className="h-6 w-6 text-accent" />
                <h3 className="mt-3 font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm text-muted">{text}</p>
              </motion.article>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button to="/learn">Explore full learning path</Button>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Insights"
            title="Latest market insights"
            description="Short educational summaries updated for learners."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {latestInsights.map((item) => (
              <article key={item.title} className="glass-panel rounded-2xl p-5">
                <span className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
                  {item.category}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.description}</p>
                <Link
                  to="/market-insights"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-cyan-300"
                >
                  Read more <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface-raised/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Tools"
            title="Trading tools for learners"
            description="Practical resources to support study, planning, and consistency."
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tradingTools.map((tool) => (
              <article
                key={tool}
                className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-slate-300"
              >
                <Wrench className="h-4 w-4 shrink-0 text-trade" />
                {tool}
              </article>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <FAQ />

      <section className="border-t border-border py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <SectionHeader
            label="Newsletter"
            title="Weekly learning & market briefing"
            description="Get beginner-friendly lessons and insight summaries in your inbox."
          />
          <form onSubmit={onNewsletterSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@email.com"
              className="min-w-0 flex-1 rounded-xl border border-border bg-surface-overlay px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-accent/50 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-cyan-500 to-trade px-6 py-3 text-sm font-semibold text-surface hover:from-cyan-400 hover:to-emerald-400"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  )
}
