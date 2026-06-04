import { CompanyStorySection } from '../components/about/CompanyStorySection'
import { MissionVisionSection } from '../components/about/MissionVisionSection'
import { TeamSection } from '../components/about/TeamSection'
import { PageHeader } from '../components/layout/PageHeader'
import { PageMeta } from '../components/seo/PageMeta'
import { COMPANY } from '../data/siteContent'

export function AboutPage() {
  return (
    <>
      <PageMeta
        title="About Us"
        description={`Learn about ${COMPANY.name}—our story, mission, vision, and leadership team.`}
        path="/about"
      />
      <PageHeader
        label="About"
        title={`The ${COMPANY.shortName} story`}
        description="Nearly three decades of advisory excellence serving businesses, families, and institutions."
      />
      <CompanyStorySection />
      <MissionVisionSection />
      <TeamSection />
    </>
  )
}
