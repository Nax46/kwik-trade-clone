import { Award, ShieldCheck, Users, Zap } from 'lucide-react'
import { FadeIn } from '../common/FadeIn'

const trustItems = [
  {
    icon: ShieldCheck,
    title: 'Transparent guidance',
    description: 'Clear education—no hidden fees or unrealistic profit promises.',
  },
  {
    icon: Users,
    title: '1,200+ learners',
    description: 'Active traders and beginners across India trust our programs.',
  },
  {
    icon: Zap,
    title: 'Daily market insights',
    description: 'Actionable analysis with levels, bias, and risk context.',
  },
  {
    icon: Award,
    title: 'Structured mentorship',
    description: 'Step-by-step paths from basics to disciplined live trading.',
  },
]

export function TrustSection() {
  return (
    <section className="border-y border-slate-100 bg-white py-12 sm:py-16">
      <div className="section-container">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map(({ icon: Icon, title, description }, index) => (
            <FadeIn key={title} delay={index * 0.06}>
              <div className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-5 transition hover:border-brand-200 hover:bg-brand-50/30">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white shadow-soft">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{description}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
