import { FadeIn } from '../common/FadeIn'
import { SectionHeading } from '../common/SectionHeading'
import { whyChooseUs } from '../../data/siteContent'

export function WhyChooseUsSection() {
  return (
    <section className="bg-slate-50 section-spacing">
      <div className="section-container">
        <SectionHeading
          label="Why choose us"
          title="Built on trust, discipline, and results"
          description="Learners stay with TradeWithManish because we earn confidence through process, transparency, and accountable mentorship."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:mt-14">
          {whyChooseUs.map(({ title, description, icon: Icon }, index) => (
            <FadeIn key={title} delay={index * 0.08}>
              <article className="card-surface h-full p-6 hover:border-brand-200">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-indigo-50 text-brand-600">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
