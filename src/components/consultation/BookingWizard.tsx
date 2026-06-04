import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  GraduationCap,
  Loader2,
} from 'lucide-react'
import { useState } from 'react'
import { api } from '../../api'
import { useToast } from '../../context/ToastContext'
import { experienceLevels, interestedServices } from '../../data/siteContent'
import { formatConsultationSummary } from '../../data/consultation'
import { getApiErrorMessage } from '../../lib/apiError'
import { Button } from '../ui/Button'
import { FormInput } from '../ui/FormInput'
import { SelectionCard } from '../ui/SelectionCard'
import { StepIndicator, type StepItem } from '../ui/StepIndicator'
import { TimeSlotPicker } from './TimeSlotPicker'

const STEPS: StepItem[] = [
  { id: 1, label: 'Service' },
  { id: 2, label: 'Experience' },
  { id: 3, label: 'Date' },
  { id: 4, label: 'Time' },
  { id: 5, label: 'Confirm' },
]

const serviceIcons: Record<string, typeof BarChart3> = {
  'Trading Education': GraduationCap,
  'Market Analysis': BarChart3,
  'Trading Mentorship': GraduationCap,
  'Technical Analysis': BarChart3,
  'Risk Management': BarChart3,
  'Portfolio Guidance': BarChart3,
}

function isValidContact(form: { name: string; email: string; phone: string }) {
  if (form.name.trim().length < 2) return 'Please enter your full name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Please enter a valid email address.'
  if (form.phone.replace(/\D/g, '').length < 10) return 'Please enter a valid phone number.'
  return null
}

export function BookingWizard() {
  const { showSuccess, showError } = useToast()
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    interestedService: '',
    experienceLevel: '',
    date: '',
    timeSlot: '',
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const goNext = () => {
    setError('')
    if (step === 1 && !form.interestedService) {
      setError('Please select a service to continue.')
      return
    }
    if (step === 2 && !form.experienceLevel) {
      setError('Please select your experience level.')
      return
    }
    if (step === 3 && !form.date) {
      console.log('[BookingWizard] step 3 validation failed', { formDate: form.date })
      setError('Please choose a date for your consultation.')
      return
    }
    if (step === 4 && !form.timeSlot) {
      setError('Please choose an available time slot.')
      return
    }
    if (step === 5) {
      const contactErr = isValidContact(form)
      if (contactErr) {
        setError(contactErr)
        return
      }
      void submitBooking()
      return
    }
    setStep((s) => Math.min(s + 1, 5))
  }

  const goBack = () => {
    setError('')
    setStep((s) => Math.max(s - 1, 1))
  }

  const submitBooking = async () => {
    setLoading(true)
    setError('')
    try {
      await api.createBooking({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        experienceLevel: form.experienceLevel,
        interestedService: form.interestedService,
        message: form.message.trim() || undefined,
        date: form.date,
        timeSlot: form.timeSlot,
      })
      setSubmitted(true)
      showSuccess('Consultation booked. We will confirm by email shortly.')
    } catch (err) {
      const msg = getApiErrorMessage(
        err,
        'Booking failed. The slot may have been taken—please pick another time.',
      )
      setError(msg)
      showError(msg)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="card-surface p-8 text-center sm:p-10" role="status" aria-live="polite">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-8 w-8" aria-hidden />
        </span>
        <h2 className="mt-6 text-2xl font-bold text-slate-900">Consultation booked</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-600">
          Thank you, <strong>{form.name}</strong>. Your session is requested for{' '}
          <strong>{formatConsultationSummary(form.date, form.timeSlot)}</strong>. We will confirm
          by email at <strong>{form.email}</strong> shortly.
        </p>
        <Button to="/" variant="outline" className="mt-8">
          Back to home
        </Button>
      </div>
    )
  }

  return (
    <div className="card-surface p-5 sm:p-8">
      <StepIndicator steps={STEPS} currentStep={step} />

      {error && (
        <p className="alert-error mb-6" role="alert">
          {error}
        </p>
      )}

      {step === 1 && (
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Select a service</h2>
          <p className="mt-1 text-sm text-slate-600">What would you like help with?</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {interestedServices.map((service) => {
              const Icon = serviceIcons[service] ?? BarChart3
              return (
                <SelectionCard
                  key={service}
                  title={service}
                  selected={form.interestedService === service}
                  onSelect={() => setForm({ ...form, interestedService: service })}
                  icon={<Icon className="h-5 w-5" />}
                />
              )
            })}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Select your experience</h2>
          <p className="mt-1 text-sm text-slate-600">This helps us tailor the session.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {experienceLevels.map((level) => (
              <SelectionCard
                key={level}
                title={level}
                selected={form.experienceLevel === level}
                onSelect={() => setForm({ ...form, experienceLevel: level })}
              />
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Choose a date</h2>
          <p className="mt-1 text-sm text-slate-600">Pick a weekday that works for you.</p>
          <div className="mt-6">
            <TimeSlotPicker
              mode="date"
              selectedDate={form.date}
              selectedSlot={form.timeSlot}
              onDateChange={(date) => {
                console.log('[BookingWizard] onDateChange', date)
                setForm((prev) => {
                  const next = { ...prev, date, timeSlot: '' }
                  console.log('[BookingWizard] form.date updated', next.date)
                  return next
                })
              }}
              onSlotChange={(timeSlot) =>
                setForm((prev) => ({ ...prev, timeSlot }))
              }
            />
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Choose a time slot</h2>
          <p className="mt-1 text-sm text-slate-600">
            Available slots for your selected date (IST, 30 min).
          </p>
          <div className="mt-6">
            <TimeSlotPicker
              mode="time"
              selectedDate={form.date}
              selectedSlot={form.timeSlot}
              onDateChange={(date) =>
                setForm((prev) => ({ ...prev, date, timeSlot: '' }))
              }
              onSlotChange={(timeSlot) =>
                setForm((prev) => ({ ...prev, timeSlot }))
              }
            />
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Review & confirm</h2>
            <p className="mt-1 text-sm text-slate-600">Check your details and complete booking.</p>
          </div>

          <dl className="rounded-xl border border-slate-200 bg-slate-50/80 divide-y divide-slate-200 text-sm">
            <div className="flex justify-between gap-4 px-4 py-3">
              <dt className="text-slate-500">Service</dt>
              <dd className="font-medium text-slate-900 text-right">{form.interestedService}</dd>
            </div>
            <div className="flex justify-between gap-4 px-4 py-3">
              <dt className="text-slate-500">Experience</dt>
              <dd className="font-medium text-slate-900 text-right">{form.experienceLevel}</dd>
            </div>
            <div className="flex justify-between gap-4 px-4 py-3">
              <dt className="text-slate-500">When</dt>
              <dd className="font-medium text-slate-900 text-right">
                {formatConsultationSummary(form.date, form.timeSlot)}
              </dd>
            </div>
          </dl>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormInput
              label="Full name"
              id="booking-name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              disabled={loading}
            />
            <FormInput
              label="Phone"
              id="booking-phone"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              disabled={loading}
            />
            <div className="sm:col-span-2">
              <FormInput
                label="Email"
                id="booking-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                disabled={loading}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="booking-notes" className="label-base">
                Message (optional)
              </label>
              <textarea
                id="booking-notes"
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                disabled={loading}
                className="input-base min-h-[88px]"
              />
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-between">
        {step > 1 ? (
          <button type="button" onClick={goBack} disabled={loading} className="btn-outline w-full sm:w-auto">
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        ) : (
          <span />
        )}
        <button
          type="button"
          onClick={goNext}
          disabled={loading}
          className="btn-primary w-full sm:ml-auto sm:w-auto"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Booking…
            </>
          ) : step === 5 ? (
            <>
              Confirm booking
              <CheckCircle2 className="h-4 w-4" />
            </>
          ) : (
            <>
              Continue
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  )
}
