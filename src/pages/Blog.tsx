import { useState, type FormEvent } from 'react'
import { Footer } from '../components/layout/Footer'
import { PageHeader } from '../components/layout/PageHeader'
import { Toast, type ToastState } from '../components/ui/Toast'
import { submitGenericForm } from '../services/form.service'

const posts = [
  { title: 'Trading 101: How markets actually work', description: 'A beginner-friendly introduction to buyers, sellers, liquidity, and price discovery.', category: 'Basics', date: 'May 24, 2026' },
  { title: 'Understanding support and resistance', description: 'Learn how traders identify key levels and why context matters more than lines alone.', category: 'Technical', date: 'May 22, 2026' },
  { title: 'Risk management rules every beginner needs', description: 'Position sizing, stop-loss discipline, and protecting your learning account.', category: 'Risk', date: 'May 20, 2026' },
  { title: 'Forex sessions explained for new traders', description: 'When markets are most active and what that means for volatility and spreads.', category: 'Forex', date: 'May 18, 2026' },
  { title: 'Gold trading basics: what moves the price', description: 'Inflation, USD strength, and safe-haven flows in plain language.', category: 'Commodities', date: 'May 16, 2026' },
  { title: 'How to read a candlestick chart', description: 'Open, high, low, close — and the most useful patterns to study first.', category: 'Charts', date: 'May 14, 2026' },
  { title: 'Market psychology: fear, greed, and discipline', description: 'Why emotional control is a skill and how to build better habits.', category: 'Psychology', date: 'May 12, 2026' },
  { title: 'Economic calendar guide for beginners', description: 'Which events matter, how to prepare, and how to avoid overtrading news.', category: 'Fundamentals', date: 'May 10, 2026' },
  { title: 'Crypto volatility: what learners should know', description: 'Liquidity, leverage risk, and why smaller size matters in fast markets.', category: 'Crypto', date: 'May 08, 2026' },
  { title: 'Building a weekly trading study routine', description: 'A simple schedule for reviewing charts, journaling, and improving consistency.', category: 'Habits', date: 'May 06, 2026' },
]

export function BlogPage() {
  const [email, setEmail] = useState('')
  const [toast, setToast] = useState<ToastState | null>(null)

  const handleNewsletterSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
      <PageHeader
        label="Blog"
        title="Trading education articles"
        description="In-depth guides on markets, risk, psychology, and learning strategies."
      />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.title} className="overflow-hidden rounded-2xl border border-border bg-surface-raised">
                <div className="flex h-44 items-end bg-gradient-to-br from-cyan-500/20 via-surface-overlay to-surface p-4">
                  <span className="rounded-full bg-black/30 px-2.5 py-1 text-xs font-medium text-cyan-200">
                    {post.category}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-xs text-muted">{post.date}</p>
                  <h2 className="mt-2 text-lg font-semibold text-white">{post.title}</h2>
                  <p className="mt-2 text-sm text-muted">{post.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface-raised/30 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white">Get new articles by email</h2>
          <p className="mt-2 text-sm text-muted">Weekly educational articles — no spam, unsubscribe anytime.</p>
          <form onSubmit={handleNewsletterSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              placeholder="you@example.com"
              className="min-w-0 flex-1 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-accent/40 focus:outline-none"
            />
            <button type="submit" className="rounded-lg bg-gradient-to-r from-cyan-500 to-trade px-5 py-2.5 text-sm font-semibold text-surface">
              Subscribe
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  )
}
