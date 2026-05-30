import { motion } from 'framer-motion'
import { BookOpen, Mail, MapPin, Phone } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { submitGenericForm } from '../../services/form.service'

const exploreLinks = [
  { label: 'Learn', to: '/learn' },
  { label: 'Market Insights', to: '/market-insights' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
] as const

const moreLinks = [
  { label: 'About', to: '/about' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms & Conditions', to: '/terms-conditions' },
] as const

export function Footer() {
  const [email, setEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<string | null>(null)

  const onNewsletterSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email.trim()) {
      setNewsletterStatus('Enter a valid email to subscribe.')
      return
    }
    try {
      const response = await submitGenericForm({
        formType: 'Newsletter',
        fields: { email: email.trim() },
      })
      setNewsletterStatus(response.message)
      if (response.success) setEmail('')
    } catch {
      setNewsletterStatus('Unable to subscribe at the moment.')
    }
  }

  return (
    <footer className="border-t border-border bg-surface-raised">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5 text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent ring-1 ring-accent/30">
                <BookOpen className="h-5 w-5" />
              </span>
              <span className="text-lg font-semibold">Kwik Trade</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Trading education, market insights, and beginner guidance — built to help you learn with clarity.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Explore</h3>
            <ul className="mt-4 space-y-2.5">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-muted transition hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">More</h3>
            <ul className="mt-4 space-y-2.5">
              {moreLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-muted transition hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-6 space-y-3 text-sm text-muted">
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a href="mailto:support@kwiktrade.com" className="hover:text-white">
                  support@kwiktrade.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>+1 (800) 555-1234</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>San Francisco, CA</span>
              </li>
            </ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel rounded-2xl p-5"
          >
            <h3 className="text-sm font-semibold text-white">Weekly newsletter</h3>
            <p className="mt-2 text-sm text-muted">Learning tips and market insight summaries.</p>
            <form className="mt-4 flex flex-col gap-2" onSubmit={onNewsletterSubmit}>
              <input
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-accent/50 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-lg bg-gradient-to-r from-cyan-500 to-trade px-4 py-2 text-sm font-semibold text-surface"
              >
                Subscribe
              </button>
            </form>
            {newsletterStatus && <p className="mt-2 text-xs text-muted">{newsletterStatus}</p>}
          </motion.div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Kwik Trade. Educational content only — not financial advice.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-muted">
            <Link to="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms-conditions" className="hover:text-white">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
