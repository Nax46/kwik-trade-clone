import { Target } from 'lucide-react'
import { FadeIn } from '../common/FadeIn'
import { missionVision } from '../../data/siteContent'

export function MissionVisionSection() {
  return (
    <section className="border-t border-slate-100 bg-slate-50 py-16 sm:py-20">
      <div className="section-container">
        <div className="grid gap-8 md:grid-cols-2">
          <FadeIn>
            <article className="card-surface h-full p-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Target className="h-5 w-5" />
              </span>
              <h2 className="mt-4 text-xl font-bold text-slate-900">Mission</h2>
              <p className="mt-4 leading-relaxed text-slate-600">{missionVision.mission}</p>
            </article>
          </FadeIn>
          <FadeIn delay={0.1}>
            <article className="card-surface h-full p-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Target className="h-5 w-5" />
              </span>
              <h2 className="mt-4 text-xl font-bold text-slate-900">Vision</h2>
              <p className="mt-4 leading-relaxed text-slate-600">{missionVision.vision}</p>
            </article>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
