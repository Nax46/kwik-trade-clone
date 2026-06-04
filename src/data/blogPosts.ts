export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  readTime: string
  publishedAt: string
  coverGradient: string
  content: string[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'navigating-rate-cycles-2026',
    title: 'Navigating Rate Cycles in 2026: A Guide for Business Leaders',
    excerpt:
      'How shifting central bank policy affects capital allocation, refinancing timelines, and treasury strategy for growth companies.',
    category: 'Macro Strategy',
    author: 'Priya Natarajan',
    readTime: '8 min read',
    publishedAt: '2026-05-28',
    coverGradient: 'from-brand-500/20 to-indigo-500/30',
    content: [
      'Interest rate expectations remain the dominant narrative for allocators and CFOs alike. Understanding the transmission mechanism—from policy rates to credit spreads—is essential for disciplined capital planning.',
      'Organizations with floating-rate exposure should stress-test refinancing scenarios across multiple rate paths. We recommend modeling at least three cases: base, higher-for-longer, and rapid easing.',
      'Meridian advisors are seeing increased demand for liability management reviews as boards prioritize balance sheet resilience alongside growth investment.',
    ],
  },
  {
    slug: 'wealth-transfer-family-governance',
    title: 'Wealth Transfer and Family Governance: Building Structures That Last',
    excerpt:
      'Practical frameworks for multi-generational wealth stewardship, trustee coordination, and aligned decision-making.',
    category: 'Wealth Management',
    author: 'Victoria Hartwell',
    readTime: '10 min read',
    publishedAt: '2026-05-22',
    coverGradient: 'from-indigo-500/20 to-violet-500/30',
    content: [
      'Successful wealth transfer is less about tax mechanics alone and more about governance—clear roles, communication rhythms, and shared purpose across generations.',
      'Family councils and investment policy statements (IPS) provide structure without constraining flexibility when markets or life events shift priorities.',
      'Early engagement of the next generation, paired with professional education, reduces friction when transition timelines accelerate.',
    ],
  },
  {
    slug: 'ma-readiness-mid-market',
    title: 'M&A Readiness for Mid-Market Companies: What Buyers Expect',
    excerpt:
      'Preparing financial reporting, data rooms, and management narratives before you enter a formal sale process.',
    category: 'Corporate Finance',
    author: 'Marcus Delaney',
    readTime: '7 min read',
    publishedAt: '2026-05-18',
    coverGradient: 'from-emerald-500/15 to-brand-500/25',
    content: [
      'Buyers reward sellers who present clean historical financials, normalized EBITDA bridges, and transparent customer concentration disclosures.',
      'Quality of earnings (QoE) reviews are increasingly standard—even for sub-$100M transactions—so preparing early avoids timeline compression later.',
      'Management presentations should articulate strategic rationale, not only financial history. Narrative coherence often influences valuation as much as multiples.',
    ],
  },
  {
    slug: 'risk-frameworks-scaling-firms',
    title: 'Enterprise Risk Frameworks for Scaling Financial Services Firms',
    excerpt:
      'Designing risk registers, control libraries, and board reporting that scale with regulatory complexity.',
    category: 'Risk & Compliance',
    author: 'Daniel Reeves',
    readTime: '9 min read',
    publishedAt: '2026-05-14',
    coverGradient: 'from-amber-500/15 to-orange-500/20',
    content: [
      'As firms grow, informal risk management becomes a liability. Documented frameworks align operations, compliance, and leadership on priorities and accountability.',
      'We recommend tiering risks by materiality and mapping controls to key processes—not creating bureaucracy for its own sake.',
      'Regular board-level reporting with trend analysis helps committees focus on emerging issues rather than static checklists.',
    ],
  },
  {
    slug: 'fx-hedging-global-operators',
    title: 'FX Hedging Policy Design for Global Operators',
    excerpt:
      'When to hedge, how to set benchmarks, and coordinating treasury with commercial teams across currencies.',
    category: 'International',
    author: 'Priya Natarajan',
    readTime: '6 min read',
    publishedAt: '2026-05-10',
    coverGradient: 'from-cyan-500/15 to-brand-500/25',
    content: [
      'Currency volatility can erode margins quickly for businesses with multi-jurisdiction revenue and cost bases. A written hedging policy creates consistency.',
      'Natural hedging through operational alignment should be explored before derivative overlays—often the most cost-effective first step.',
      'Meridian works with treasury teams to define exposure measurement, hedge ratios, and performance attribution that boards can understand.',
    ],
  },
  {
    slug: 'retirement-plan-fiduciary-essentials',
    title: 'Retirement Plan Fiduciary Essentials for Growing Employers',
    excerpt:
      'Oversight duties, vendor due diligence, and participant outcomes in competitive labor markets.',
    category: 'Benefits',
    author: 'Victoria Hartwell',
    readTime: '5 min read',
    publishedAt: '2026-05-06',
    coverGradient: 'from-violet-500/15 to-indigo-500/25',
    content: [
      'Plan sponsors carry fiduciary responsibility for prudent process—not guaranteed investment outcomes. Documentation of decisions is critical.',
      'Benchmarking fees, fund menus, and participant engagement metrics should occur on a defined cadence, not only at vendor renewal.',
      'Education programs that improve deferral rates and diversification benefit both employees and retention goals.',
    ],
  },
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  return blogPosts.filter((p) => p.slug !== currentSlug).slice(0, limit)
}
