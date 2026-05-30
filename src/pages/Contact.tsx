import { zodResolver } from '@hookform/resolvers/zod'
import { isAxiosError } from 'axios'
import { useCallback, useState, type FormEvent } from 'react'
import { useForm } from 'react-hook-form'
import { FormField } from '../components/auth/FormField'
import { SubmitButton } from '../components/auth/SubmitButton'
import { PageHeader } from '../components/layout/PageHeader'
import { Footer } from '../components/layout/Footer'
import { FormTextarea } from '../components/ui/FormTextarea'
import { Toast, type ToastState } from '../components/ui/Toast'
import { contactSchema, type ContactFormValues } from '../lib/validations/contact'
import { submitContactForm } from '../services/contact.service'
import { submitGenericForm } from '../services/form.service'

export function ContactPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isCallbackLoading, setIsCallbackLoading] = useState(false)
  const [callbackPhone, setCallbackPhone] = useState('')
  const [toast, setToast] = useState<ToastState | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { fullName: '', email: '', phone: '', subject: '', message: '' },
  })

  const dismissToast = useCallback(() => setToast(null), [])

  const onSubmit = handleSubmit(async (values) => {
    setIsLoading(true)
    dismissToast()
    try {
      const response = await submitContactForm(values)
      setToast({
        id: Date.now(),
        variant: response.success ? 'success' : 'error',
        message: response.message,
      })
      if (response.success) reset()
    } catch (error) {
      const message = isAxiosError(error)
        ? (error.response?.data?.message ?? 'Something went wrong')
        : 'Something went wrong'
      setToast({ id: Date.now(), variant: 'error', message })
    } finally {
      setIsLoading(false)
    }
  })

  const handleCallbackSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsCallbackLoading(true)
    dismissToast()
    try {
      const response = await submitGenericForm({
        formType: 'Callback',
        fields: { phone: callbackPhone.trim() },
      })
      setToast({
        id: Date.now(),
        variant: response.success ? 'success' : 'error',
        message: response.message,
      })
      if (response.success) setCallbackPhone('')
    } catch {
      setToast({ id: Date.now(), variant: 'error', message: 'Unable to request callback.' })
    } finally {
      setIsCallbackLoading(false)
    }
  }

  return (
    <>
      <Toast toast={toast} onDismiss={dismissToast} />
      <PageHeader
        label="Contact"
        title="Get in touch"
        description="Ask a learning question, request guidance, or tell us how we can help."
      />
      <section className="py-12 sm:py-16">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
          <form
            onSubmit={onSubmit}
            noValidate
            className="space-y-4 rounded-2xl border border-border glass-panel p-6 sm:p-8 lg:col-span-3"
          >
            <FormField
              label="Name"
              id="fullName"
              disabled={isLoading}
              error={errors.fullName}
              {...register('fullName')}
            />
            <FormField
              label="Email"
              id="email"
              type="email"
              disabled={isLoading}
              error={errors.email}
              {...register('email')}
            />
            <FormField
              label="Phone"
              id="phone"
              type="tel"
              disabled={isLoading}
              error={errors.phone}
              {...register('phone')}
            />
            <FormField
              label="Subject"
              id="subject"
              disabled={isLoading}
              error={errors.subject}
              {...register('subject')}
            />
            <FormTextarea
              label="Message"
              id="message"
              disabled={isLoading}
              error={errors.message}
              {...register('message')}
            />
            <SubmitButton isLoading={isLoading} loadingText="Sending…">
              Send message
            </SubmitButton>
          </form>

          <aside className="space-y-6 lg:col-span-2">
            <article className="glass-panel rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white">Request a callback</h3>
              <p className="mt-1 text-sm text-muted">Leave your number and we will reach out on business days.</p>
              <form onSubmit={handleCallbackSubmit} className="mt-4 space-y-3">
                <input
                  value={callbackPhone}
                  onChange={(event) => setCallbackPhone(event.target.value)}
                  type="tel"
                  placeholder="Phone number"
                  disabled={isCallbackLoading}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-accent/40 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-trade px-4 py-2 text-sm font-semibold text-surface"
                >
                  {isCallbackLoading ? 'Sending…' : 'Request callback'}
                </button>
              </form>
            </article>
            <article className="glass-panel rounded-2xl p-6 text-sm text-slate-300">
              <h3 className="text-lg font-semibold text-white">Support hours</h3>
              <p className="mt-2">Monday – Friday, 9:00 AM – 6:00 PM (local time)</p>
              <p className="mt-1">Email: support@kwiktrade.com</p>
            </article>
          </aside>
        </div>
      </section>
      <Footer />
    </>
  )
}
