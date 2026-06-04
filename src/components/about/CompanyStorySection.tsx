import { FadeIn } from '../common/FadeIn'
import { missionVision } from '../../data/siteContent'

export function CompanyStorySection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="section-container max-w-4xl">
        <FadeIn>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Our story</h2>
          <p className="mt-6 text-base leading-relaxed text-slate-600">{missionVision.story}</p>
        </FadeIn>
      </div>
    </section>
  )
}
