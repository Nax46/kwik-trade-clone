import { useEffect } from 'react'
import { SITE_URL } from '../../config/seo'
import { COMPANY } from '../../data/siteContent'

type StructuredDataProps = {
  data: Record<string, unknown> | Record<string, unknown>[]
  id?: string
}

export function StructuredData({ data, id = 'structured-data' }: StructuredDataProps) {
  useEffect(() => {
    const scriptId = `json-ld-${id}`
    let script = document.getElementById(scriptId) as HTMLScriptElement | null
    if (!script) {
      script = document.createElement('script')
      script.id = scriptId
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(data)
    return () => {
      script?.remove()
    }
  }, [data, id])

  return null
}

export function OrganizationSchema() {
  return (
    <StructuredData
      id="organization"
      data={{
        '@context': 'https://schema.org',
        '@type': 'FinancialService',
        name: COMPANY.name,
        url: SITE_URL,
        logo: `${SITE_URL}/favicon.svg`,
        description: COMPANY.description,
        email: COMPANY.email,
        telephone: COMPANY.phone,
        address: {
          '@type': 'PostalAddress',
          streetAddress: '100 Market Street, Suite 2400',
          addressLocality: 'San Francisco',
          addressRegion: 'CA',
          postalCode: '94105',
          addressCountry: 'US',
        },
        sameAs: ['https://linkedin.com', 'https://twitter.com'],
      }}
    />
  )
}

export function ArticleSchema({
  title,
  description,
  author,
  datePublished,
  url,
}: {
  title: string
  description: string
  author: string
  datePublished: string
  url: string
}) {
  return (
    <StructuredData
      id="article"
      data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        author: { '@type': 'Person', name: author },
        datePublished,
        publisher: {
          '@type': 'Organization',
          name: COMPANY.name,
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.svg` },
        },
        mainEntityOfPage: url,
      }}
    />
  )
}
