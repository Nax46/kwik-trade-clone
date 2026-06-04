import { useAnimatedCounter } from '../../hooks/useAnimatedCounter'
import { useInViewOnce } from '../../hooks/useInViewOnce'
import { statistics } from '../../data/siteContent'
import { FadeIn } from '../common/FadeIn'
import { SectionHeading } from '../common/SectionHeading'
import { StatCardSkeleton } from '../ui/StatCardSkeleton'

function StatCard({
  label,
  value,
  suffix,
  prefix,
  enabled,
}: {
  label: string
  value: number
  suffix: string
  prefix: string
  enabled: boolean
}) {
  const decimals = value % 1 !== 0 ? 1 : 0
  const count = useAnimatedCounter({ end: value, enabled, decimals })

  return (
    <article className="card-surface p-6 text-center sm:p-8">
      <p className="text-3xl font-bold text-slate-900 sm:text-4xl">
        {prefix}
        {decimals > 0 ? count.toFixed(1) : Math.round(count).toLocaleString()}
        {suffix}
      </p>
      <p className="mt-2 text-sm font-medium text-slate-600">{label}</p>
    </article>
  )
}

export function StatisticsSection() {
  const { ref, isInView } = useInViewOnce<HTMLDivElement>({ threshold: 0.2 })

  return (
    <section className="border-y border-slate-100 bg-gradient-to-b from-white to-brand-50/30 section-spacing">
      <div className="section-container">
        <SectionHeading
          label="By the numbers"
          title="Scale backed by personal service"
          description="Our growth reflects lasting client relationships—not transactional volume."
        />
        <div ref={ref} className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {!isInView
            ? statistics.map((_, index) => (
                <FadeIn key={index} delay={index * 0.05}>
                  <StatCardSkeleton />
                </FadeIn>
              ))
            : statistics.map((stat, index) => (
                <FadeIn key={stat.label} delay={index * 0.08}>
                  <StatCard {...stat} enabled={isInView} />
                </FadeIn>
              ))}
        </div>
      </div>
    </section>
  )
}
