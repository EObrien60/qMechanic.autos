import type { Metadata } from 'next'
import { jobCards, inspections, aiInvoices, fleetTracking, analytics, compliance } from '../flags'
import HomeContent from './HomeContent'

export const metadata: Metadata = {
  title: 'qMechanic | Modern Fleet Management',
  description:
    'qMechanic — digital job cards, AI-powered invoice processing, fleet tracking, and compliance management. Replace paper with a system built for modern workshops. Live in Ireland & the UK.',
  alternates: { canonical: '/' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'qMechanic',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'iOS, Web',
  description:
    'Fleet management software with digital job cards, AI invoice processing, live fleet tracking, and compliance management.',
  url: 'https://qmechanic.autos',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'EUR',
    lowPrice: '8',
    highPrice: '35',
    offerCount: '3',
  },
  provider: {
    '@type': 'Organization',
    name: 'OBH Software',
    url: 'https://qmechanic.autos',
    logo: 'https://qmechanic.autos/qmlogo.png',
    address: { '@type': 'PostalAddress', addressCountry: 'IE' },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+353-86-836-3332',
      email: 'info@obhsoftware.ie',
      contactType: 'sales',
    },
  },
}

export default async function HomePage() {
  const [jc, insp, ai, fleet, anal, comp] = await Promise.all([
    jobCards(),
    inspections(),
    aiInvoices(),
    fleetTracking(),
    analytics(),
    compliance(),
  ])

  const enabledIds = new Set<string>()
  if (jc) enabledIds.add('job-cards')
  if (insp) enabledIds.add('inspections')
  if (ai) enabledIds.add('ai-invoices')
  if (fleet) enabledIds.add('fleet-tracking')
  if (anal) enabledIds.add('analytics')
  if (comp) enabledIds.add('compliance')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeContent enabledIds={Array.from(enabledIds)} />
    </>
  )
}
