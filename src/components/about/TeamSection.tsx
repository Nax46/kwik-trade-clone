import { FadeIn } from '../common/FadeIn'
import { SectionHeading } from '../common/SectionHeading'
import { teamMembers } from '../../data/siteContent'

export function TeamSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="section-container">
        <SectionHeading
          label="Leadership"
          title="Meet our team"
          description="Experienced professionals committed to your financial success."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <FadeIn key={member.name} delay={index * 0.08}>
              <article className="card-surface overflow-hidden">
                <div className="flex h-32 items-center justify-center bg-gradient-to-br from-brand-100 to-indigo-100">
                  <span className="text-3xl font-bold text-brand-700">{member.image}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-slate-900">{member.name}</h3>
                  <p className="mt-1 text-sm font-medium text-brand-600">{member.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{member.bio}</p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
