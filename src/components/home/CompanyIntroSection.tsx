import { FadeIn } from '../common/FadeIn'
import { SectionHeading } from '../common/SectionHeading'
import { COMPANY } from '../../data/siteContent'

export function CompanyIntroSection() {
  return (
    <section className="border-t border-slate-100 section-spacing">
      <div className="section-container">
        <SectionHeading
          label="Who we are"
          title={`About ${COMPANY.shortName}`}
          description="Professional trading education for Indian markets—structured programs, daily analysis, and mentorship that meets you where you are."
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12 lg:mt-14">
          <FadeIn>
            <div className="card-surface h-full p-6 sm:p-8">
              <h3 className="text-xl font-semibold text-slate-900">Our approach</h3>
              <p className="mt-4 leading-relaxed text-slate-600">
                We combine practical market education with disciplined risk management. Every
                engagement begins with understanding your experience, goals, and how much time you
                can commit to learning.
              </p>
              <p className="mt-4 leading-relaxed text-slate-600">
                From technical analysis to mentorship, Manish and the team coordinate guidance
                across education, insights, and live-market context—so you receive cohesive support,
                not scattered tips.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex h-full flex-col justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-indigo-700 p-6 text-white shadow-elevated sm:p-8">
              <p className="text-sm font-medium uppercase tracking-wider text-brand-100">
                Since day one
              </p>
              <p className="mt-4 text-xl font-semibold leading-snug sm:text-2xl">
                &ldquo;Clarity over complexity—and discipline over hype.&rdquo;
              </p>
              <p className="mt-6 text-sm text-brand-100">— TradeWithManish philosophy</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
