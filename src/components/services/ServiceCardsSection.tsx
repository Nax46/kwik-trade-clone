import { FadeIn } from '../common/FadeIn'
import { SectionHeading } from '../common/SectionHeading'
import { services } from '../../data/siteContent'

export function ServiceCardsSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="section-container">
        <SectionHeading
          label="Overview"
          title="Services at a glance"
          description="Six core practice areas delivering integrated support across your financial lifecycle."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ id, title, summary, icon: Icon }, index) => (
            <FadeIn key={id} delay={index * 0.06}>
              <article id={id} className="card-surface scroll-mt-24 p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{summary}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
