import { zodResolver } from '@hookform/resolvers/zod'
import { isAxiosError } from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AuthBackButton } from '../components/auth/AuthBackButton'
import { AuthCard } from '../components/auth/AuthCard'
import { AuthAlert } from '../components/auth/AuthAlert'
import { FormField } from '../components/auth/FormField'
import { SubmitButton } from '../components/auth/SubmitButton'
import { useAuth } from '../context/AuthContext'
import { registerSchema, type RegisterFormValues } from '../lib/validations/auth'

export function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = handleSubmit(async (values) => {
    setIsLoading(true)
    setError(null)
    try {
      await registerUser(values)
      navigate('/login', { replace: true, state: { registered: true } })
    } catch (err) {
      if (err instanceof Error && err.message.includes('already exists')) {
        setError(err.message)
      } else if (isAxiosError(err)) {
        setError(err.response?.data?.message ?? 'Something went wrong. Please try again.')
      } else {
        setError(err instanceof Error ? err.message : 'Something went wrong')
      }
    } finally {
      setIsLoading(false)
    }
  })

  return (
    <div className="w-full max-w-md">
      <AuthBackButton />
      <AuthCard
        title="Get started"
        description="Create a free account to access lessons, insights, and updates"
        footer={
          <p className="mt-6 text-center text-sm text-muted">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-accent hover:text-emerald-300"
            >
              Sign in
            </Link>
          </p>
        }
      >
        {error && (
          <div className="mt-6">
            <AuthAlert variant="error" message={error} />
          </div>
        )}
        <form
          className={`space-y-4 ${error ? 'mt-4' : 'mt-8'}`}
          onSubmit={onSubmit}
          noValidate
        >
          <FormField
            label="Full name"
            id="fullName"
            type="text"
            autoComplete="name"
            placeholder="Jane Doe"
            disabled={isLoading}
            error={errors.fullName}
            {...register('fullName')}
          />
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
            label="Phone"
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+1 (555) 123-4567"
            disabled={isLoading}
            error={errors.phone}
            {...register('phone')}
          />
          <FormField
            label="Password"
            id="password"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            disabled={isLoading}
            error={errors.password}
            hint="At least 8 characters with uppercase, lowercase, and a number"
            {...register('password')}
          />
          <FormField
            label="Confirm password"
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            disabled={isLoading}
            error={errors.confirmPassword}
            {...register('confirmPassword')}
          />
          <SubmitButton isLoading={isLoading} loadingText="Creating account…">
            Get started
          </SubmitButton>
        </form>
      </AuthCard>
    </div>
  )
}
