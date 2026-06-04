import { Check } from 'lucide-react'
import { FadeIn } from '../common/FadeIn'
import { SectionHeading } from '../common/SectionHeading'
import { services } from '../../data/siteContent'

export function ServiceDetailsSection() {
  return (
    <section className="border-t border-slate-100 bg-slate-50 py-16 sm:py-20">
      <div className="section-container">
        <SectionHeading
          label="Details"
          title="What each engagement includes"
          description="Transparent scope and deliverables so you know exactly what to expect."
        />
        <div className="mt-14 space-y-8">
          {services.map((service, index) => (
            <FadeIn key={service.id} delay={index * 0.05}>
              <article className="card-surface overflow-hidden lg:grid lg:grid-cols-5">
                <div className="border-b border-slate-100 bg-gradient-to-br from-brand-50 to-indigo-50 p-8 lg:col-span-2 lg:border-b-0 lg:border-r">
                  <service.icon className="h-8 w-8 text-brand-600" />
                  <h3 className="mt-4 text-xl font-bold text-slate-900">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{service.description}</p>
                </div>
                <ul className="space-y-3 p-8 lg:col-span-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-slate-700">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                        <Check className="h-3 w-3" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
