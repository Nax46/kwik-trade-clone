import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { COMPANY } from '../../data/siteContent'
import { FadeIn } from '../common/FadeIn'

export function ContactInfoSection() {
  const items = [
    { icon: Mail, label: 'Email', value: COMPANY.email, href: `mailto:${COMPANY.email}` },
    { icon: Phone, label: 'Phone', value: COMPANY.phone },
    { icon: MapPin, label: 'Office', value: COMPANY.address },
    { icon: Clock, label: 'Hours', value: COMPANY.hours },
  ]

  return (
    <FadeIn className="space-y-6">
      <div className="card-surface p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-slate-900">Contact information</h2>
        <p className="mt-2 text-sm text-slate-600">
          Reach our client services team during business hours or send a message anytime.
        </p>
        <ul className="mt-6 space-y-5">
          {items.map(({ icon: Icon, label, value, href }) => (
            <li key={label} className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {label}
                </p>
                {href ? (
                  <a href={href} className="mt-0.5 text-sm text-slate-700 hover:text-brand-600">
                    {value}
                  </a>
                ) : (
                  <p className="mt-0.5 text-sm text-slate-700">{value}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-brand-100 bg-brand-50/50 p-6">
        <h3 className="font-semibold text-slate-900">New client inquiries</h3>
        <p className="mt-2 text-sm text-slate-600">
          Initial consultations are complimentary. Please include your preferred contact method and
          a brief overview of your objectives.
        </p>
      </div>
    </FadeIn>
  )
}
