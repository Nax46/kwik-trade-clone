import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useAdminAuth } from '../../context/AdminAuthContext'
import { Button } from '../../components/ui/Button'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type FormValues = z.infer<typeof schema>

export function AdminLoginPage() {
  const { user, login } = useAdminAuth()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  if (user) return <Navigate to="/admin" replace />

  const onSubmit = async (data: FormValues) => {
    try {
      await login(data.email, data.password)
      navigate('/admin')
    } catch {
      setError('root', { message: 'Invalid email or password' })
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-card">
        <div className="mb-6 text-center">
          <img src="/logo.svg" alt="" className="mx-auto h-14 w-14" />
          <h1 className="mt-4 text-xl font-bold text-slate-900">Admin Login</h1>
          <p className="text-sm text-slate-500">TradeWithManish.com</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              className="w-full rounded-lg border border-slate-200 px-3 py-2"
              {...register('email')}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              className="w-full rounded-lg border border-slate-200 px-3 py-2"
              {...register('password')}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>
          {errors.root && <p className="text-sm text-red-600">{errors.root.message}</p>}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm">
          <Link to="/admin/forgot-password" className="text-brand-600 hover:underline">
            Forgot password?
          </Link>
        </p>
      </div>
    </div>
  )
}
