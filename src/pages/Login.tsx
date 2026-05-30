import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { AuthBackButton } from '../components/auth/AuthBackButton'
import { AuthCard } from '../components/auth/AuthCard'
import { FormCheckbox } from '../components/auth/FormCheckbox'
import { FormField } from '../components/auth/FormField'
import { SubmitButton } from '../components/auth/SubmitButton'
import { AuthAlert } from '../components/auth/AuthAlert'
import { useAuth } from '../context/AuthContext'
import { loginSchema, type LoginFormValues } from '../lib/validations/auth'

export function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const registered = (location.state as { registered?: boolean } | null)?.registered

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  })

  const onSubmit = handleSubmit(async (values) => {
    setIsLoading(true)
    setError(null)
    try {
      await login(values.email, values.password)
      const redirectTo = (location.state as { from?: string } | null)?.from ?? '/learn'
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid email or password')
    } finally {
      setIsLoading(false)
    }
  })

  return (
    <div className="w-full max-w-md">
      <AuthBackButton />
      <AuthCard
        title="Welcome back"
        description="Sign in to access your learning account"
        footer={
          <p className="mt-6 text-center text-sm text-muted">
            Don&apos;t have an account?{' '}
            <Link
              to="/register"
              className="font-medium text-accent hover:text-emerald-300"
            >
              Register here
            </Link>
          </p>
        }
      >
        {registered && (
          <div className="mt-6">
            <AuthAlert
              variant="success"
              message="Registration successful! Please sign in with your email and password."
            />
          </div>
        )}
        {error && (
          <div className={registered ? 'mt-4' : 'mt-6'}>
            <AuthAlert variant="error" message={error} />
          </div>
        )}
        <form
          className={`space-y-4 ${registered || error ? 'mt-4' : 'mt-8'}`}
          onSubmit={onSubmit}
          noValidate
        >
          <FormField
            label="Email"
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            disabled={isLoading}
            error={errors.email}
            {...register('email')}
          />
          <FormField
            label="Password"
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            disabled={isLoading}
            error={errors.password}
            {...register('password')}
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <FormCheckbox
              label="Remember me"
              id="rememberMe"
              disabled={isLoading}
              {...register('rememberMe')}
            />
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-accent hover:text-emerald-300 sm:text-right"
            >
              Forgot password?
            </Link>
          </div>
          <SubmitButton isLoading={isLoading} loadingText="Signing in…">
            Sign in
          </SubmitButton>
        </form>
      </AuthCard>
    </div>
  )
}
