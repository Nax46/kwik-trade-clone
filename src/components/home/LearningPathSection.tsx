import { learningPath } from '../../data/siteContent'
import { SectionHeading } from '../common/SectionHeading'
import { FadeIn } from '../common/FadeIn'

export function LearningPathSection() {
  return (
    <section className="section-spacing bg-slate-50">
      <div className="section-container">
        <SectionHeading
          label="Beginner path"
          title="Your learning journey"
          description="A clear sequence from basics to live mentorship—no random YouTube hopping."
        />
        <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {learningPath.map((item, i) => (
            <FadeIn key={item.step} delay={i * 0.05}>
              <li className="card-surface relative h-full p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                  {item.step}
                </span>
                <h3 className="mt-4 font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.description}</p>
              </li>
            </FadeIn>
          ))}
        </ol>
      </div>
    </section>
  )
}
