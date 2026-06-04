import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { api } from '../../api'
import { Button } from '../../components/ui/Button'

export function AdminResetPasswordPage() {
  const [params] = useSearchParams()
  const token = params.get('token') ?? ''
  const [password, setPassword] = useState('')
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) {
      setError('Invalid reset link')
      return
    }
    setLoading(true)
    setError('')
    try {
      await api.auth.resetPassword(token, password)
      setDone(true)
    } catch {
      setError('Could not reset password. Link may have expired.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-card">
        <h1 className="text-xl font-bold text-slate-900">Set new password</h1>
        {done ? (
          <p className="mt-4 text-sm text-slate-600">
            Password updated.{' '}
            <Link to="/admin/login" className="text-brand-600">
              Sign in
            </Link>
          </p>
        ) : (
          <form onSubmit={submit} className="mt-4 space-y-4">
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2"
              placeholder="New password (min 8 chars)"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              Update password
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
