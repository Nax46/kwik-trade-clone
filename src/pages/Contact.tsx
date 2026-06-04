import { ContactFormSection } from '../components/contact/ContactFormSection'
import { ContactInfoSection } from '../components/contact/ContactInfoSection'
import { MapPlaceholder } from '../components/contact/MapPlaceholder'
import { PageHeader } from '../components/layout/PageHeader'
import { PageMeta } from '../components/seo/PageMeta'
import { COMPANY } from '../data/siteContent'

export function ContactPage() {
  return (
    <>
      <PageMeta
        title="Contact Us"
        description={`Get in touch with ${COMPANY.name}. We're here to answer your questions and discuss your financial goals.`}
        path="/contact"
      />
      <PageHeader
        label="Contact"
        title="Let's start a conversation"
        description="Share your objectives and our team will respond with next steps within one business day."
      />
      <section className="py-12 sm:py-16">
        <div className="section-container grid gap-8 lg:grid-cols-5 lg:gap-10">
          <div className="lg:col-span-3">
            <ContactFormSection />
          </div>
          <div className="lg:col-span-2">
            <ContactInfoSection />
          </div>
        </div>
      </section>
      <section className="border-t border-slate-100 pb-16 sm:pb-20">
        <div className="section-container">
          <MapPlaceholder />
        </div>
      </section>
    </>
  )
}
