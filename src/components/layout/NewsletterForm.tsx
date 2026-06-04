import { Loader2 } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { api } from '../../api'
import { useToast } from '../../context/ToastContext'
import { getApiErrorMessage } from '../../lib/apiError'

type NewsletterFormProps = {
  variant?: 'inline' | 'stacked'
  className?: string
}

export function NewsletterForm({ variant = 'inline', className = '' }: NewsletterFormProps) {
  const { showSuccess, showError } = useToast()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage(null)

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      const text = 'Please enter a valid email address.'
      setMessage({ type: 'error', text })
      showError(text)
      return
    }

    setLoading(true)
    try {
      await api.subscribeNewsletter(email.trim())
      const text = 'Subscribed! You will receive market updates and learning tips.'
      setMessage({ type: 'success', text })
      showSuccess(text)
      setEmail('')
    } catch (err) {
      const text = getApiErrorMessage(err, 'Subscription failed. Please try again.')
      setMessage({ type: 'error', text })
      showError(text)
    } finally {
      setLoading(false)
    }
  }

  const layoutClass =
    variant === 'inline' ? 'flex flex-col gap-3 sm:flex-row' : 'flex flex-col gap-3'

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className={layoutClass} aria-label="Newsletter subscription">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          disabled={loading}
          autoComplete="email"
          className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:from-brand-500 hover:to-indigo-500 disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Subscribing…
            </>
          ) : (
            'Subscribe'
          )}
        </button>
      </form>
      {message && (
        <p
          role="status"
          className={`mt-3 text-sm ${message.type === 'success' ? 'text-emerald-700' : 'text-red-600'}`}
        >
          {message.text}
        </p>
      )}
    </div>
  )
}
