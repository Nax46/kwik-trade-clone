import { Calendar, Video } from 'lucide-react'
import { BookingWizard } from '../components/consultation/BookingWizard'
import { FadeIn } from '../components/common/FadeIn'
import { PageHeader } from '../components/layout/PageHeader'
import { PageMeta } from '../components/seo/PageMeta'
import { COMPANY } from '../data/siteContent'

const benefits = [
  {
    icon: Calendar,
    title: 'Flexible scheduling',
    description: 'Choose from available weekday slots that fit your calendar.',
  },
  {
    icon: Video,
    title: 'Virtual or in-person',
    description: 'Meet via secure video call or WhatsApp—wherever you are in India.',
  },
]

export function ConsultationPage() {
  return (
    <>
      <PageMeta
        title="Book a Consultation"
        description="Schedule a free consultation with TradeWithManish—book in five simple steps."
        path="/consultation"
      />
      <PageHeader
        label="Consultation"
        title="Schedule your consultation"
        description="Free introductory sessions with Manish—no obligation. Book in five simple steps."
      />

      <section className="py-12 sm:py-16">
        <div className="section-container">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
            <FadeIn className="lg:col-span-2">
              <h2 className="text-xl font-semibold text-slate-900">What to expect</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Your first meeting is an opportunity to discuss your trading goals, experience,
                and how TradeWithManish can support your learning journey.
              </p>
              <ul className="mt-8 space-y-6">
                {benefits.map(({ icon: Icon, title, description }) => (
                  <li key={title} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-semibold text-slate-900">{title}</h3>
                      <p className="mt-1 text-sm text-slate-600">{description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
                <p className="font-medium text-slate-900">Prefer to call?</p>
                <p className="mt-1">
                  Reach us at{' '}
                  <a href={`tel:${COMPANY.phone.replace(/\D/g, '')}`} className="text-brand-600">
                    {COMPANY.phone}
                  </a>{' '}
                  during {COMPANY.hours.toLowerCase()}.
                </p>
              </div>
            </FadeIn>
            <div className="lg:col-span-3">
              <BookingWizard />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
