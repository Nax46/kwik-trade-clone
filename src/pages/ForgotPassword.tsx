import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AuthBackButton } from '../components/auth/AuthBackButton'
import { AuthAlert } from '../components/auth/AuthAlert'
import { AuthCard } from '../components/auth/AuthCard'
import { FormField } from '../components/auth/FormField'
import { SubmitButton } from '../components/auth/SubmitButton'
import { useSimulatedSubmit } from '../hooks/useSimulatedSubmit'
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from '../lib/validations/auth'

export function ForgotPasswordPage() {
  const [emailSent, setEmailSent] = useState(false)
  const { isLoading, simulateSubmit } = useSimulatedSubmit()

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  })

  const onSubmit = handleSubmit(async () => {
    await simulateSubmit(() => setEmailSent(true))
  })

  if (emailSent) {
    return (
      <div className="w-full max-w-md">
        <AuthBackButton to="/login" label="Back to sign in" />
        <AuthCard
          title="Check your inbox"
          description="Password reset instructions are on the way"
          footer={
            <p className="mt-6 text-center text-sm text-muted">
              <Link to="/login" className="font-medium text-accent hover:text-emerald-300">
                Back to sign in
              </Link>
            </p>
          }
        >
          <div className="mt-8">
            <AuthAlert
              variant="success"
              message={`If an account exists for ${getValues('email')}, you will receive a reset link shortly.`}
            />
            <p className="mt-4 text-center text-sm text-muted">
              Didn&apos;t receive it?{' '}
              <button
                type="button"
                className="font-medium text-accent hover:text-emerald-300"
                onClick={() => setEmailSent(false)}
              >
                Try again
              </button>
            </p>
          </div>
        </AuthCard>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md">
      <AuthBackButton />
      <AuthCard
        title="Forgot password?"
        description="Enter your email and we'll send reset instructions"
        footer={
          <p className="mt-6 text-center text-sm text-muted">
            Remember your password?{' '}
            <Link to="/login" className="font-medium text-accent hover:text-emerald-300">
              Sign in
            </Link>
          </p>
        }
      >
        <form className="mt-8 space-y-4" onSubmit={onSubmit} noValidate>
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

          <SubmitButton isLoading={isLoading} loadingText="Sending link…">
            Send reset link
          </SubmitButton>
        </form>
      </AuthCard>
    </div>
  )
}
