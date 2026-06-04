import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { api } from '../../api'
import { useToast } from '../../context/ToastContext'
import { experienceLevels, interestedServices } from '../../data/siteContent'
import { getApiErrorMessage } from '../../lib/apiError'
import { contactSchema, type ContactFormValues } from '../../lib/validations/contact'
import { FormInput } from '../ui/FormInput'
import { FormSelect } from '../ui/FormSelect'

type ContactFormSectionProps = {
  onSuccess?: (message: string) => void
}

export function ContactFormSection({ onSuccess }: ContactFormSectionProps) {
  const { showSuccess, showError } = useToast()
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      experienceLevel: experienceLevels[0],
      interestedService: interestedServices[0],
      message: '',
    },
  })

  const onSubmit = handleSubmit(async (data) => {
    setError('')
    try {
      await api.submitContact({ ...data, source: 'contact' })
      setSubmitted(true)
      const msg = 'Thank you. We will contact you within one business day.'
      showSuccess('Message sent successfully.')
      onSuccess?.(msg)
      reset()
      setTimeout(() => setSubmitted(false), 8000)
    } catch (err) {
      const msg = getApiErrorMessage(err, 'Could not send message. Please try again or call us directly.')
      setError(msg)
      showError(msg)
    }
  })

  return (
    <form onSubmit={onSubmit} noValidate className="card-surface space-y-5 p-6 sm:p-8">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">Send us a message</h2>
        <p className="mt-1 text-sm text-slate-600">
          Share your trading goals and we will guide you to the right program.
        </p>
      </div>

      {submitted && (
        <p className="alert-success" role="status" aria-live="polite">
          Message sent successfully. We will be in touch within one business day.
        </p>
      )}
      {error && (
        <p className="alert-error" role="alert">
          {error}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <FormInput
          label="Full name"
          id="name"
          disabled={isSubmitting}
          error={errors.name}
          {...register('name')}
        />
        <FormInput
          label="Phone"
          id="phone"
          type="tel"
          disabled={isSubmitting}
          error={errors.phone}
          hint="10-digit mobile number"
          {...register('phone')}
        />
      </div>
      <FormInput
        label="Email"
        id="email"
        type="email"
        disabled={isSubmitting}
        error={errors.email}
        {...register('email')}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <FormSelect
          label="Experience level"
          id="experienceLevel"
          disabled={isSubmitting}
          error={errors.experienceLevel}
          {...register('experienceLevel')}
        >
          {experienceLevels.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </FormSelect>
        <FormSelect
          label="Interested in"
          id="interestedService"
          disabled={isSubmitting}
          error={errors.interestedService}
          {...register('interestedService')}
        >
          {interestedServices.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </FormSelect>
      </div>
      <div>
        <label htmlFor="message" className="label-base">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.message)}
          className={`input-base min-h-[120px] resize-y ${errors.message ? 'input-base-error' : ''}`}
          {...register('message')}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="error-text">
            {errors.message.message}
          </p>
        )}
      </div>
      <button type="submit" disabled={isSubmitting} className="btn-primary w-full sm:w-auto">
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          'Submit message'
        )}
      </button>
    </form>
  )
}
