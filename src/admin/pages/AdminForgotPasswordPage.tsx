import { useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../api'
import { Button } from '../../components/ui/Button'

export function AdminForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.auth.forgotPassword(email)
      setSent(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-card">
        <h1 className="text-xl font-bold text-slate-900">Reset password</h1>
        {sent ? (
          <p className="mt-4 text-sm text-slate-600">
            If an account exists for that email, a reset link has been sent.
          </p>
        ) : (
          <form onSubmit={submit} className="mt-4 space-y-4">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2"
              placeholder="Admin email"
            />
            <Button type="submit" className="w-full" disabled={loading}>
              Send reset link
            </Button>
          </form>
        )}
        <Link to="/admin/login" className="mt-4 block text-center text-sm text-brand-600">
          Back to login
        </Link>
      </div>
    </div>
  )
}
