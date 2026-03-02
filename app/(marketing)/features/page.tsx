import type { Metadata } from 'next'
import { jobCards, inspections, aiInvoices, fleetTracking, analytics, compliance } from '../../flags'
import FeaturesContent from './FeaturesContent'

export const metadata: Metadata = {
  title: 'Features',
  description:
    'Explore qMechanic features: digital job cards, AI invoice processing, pre-trip inspections, live fleet tracking, analytics, and compliance management for workshops and fleets.',
}

export default async function FeaturesPage() {
  const [jc, insp, ai, fleet, anal, comp] = await Promise.all([
    jobCards(),
    inspections(),
    aiInvoices(),
    fleetTracking(),
    analytics(),
    compliance(),
  ])

  const enabledIds: string[] = []
  if (jc) enabledIds.push('job-cards')
  if (insp) enabledIds.push('inspections')
  if (ai) enabledIds.push('ai-invoices')
  if (fleet) enabledIds.push('fleet-tracking')
  if (anal) enabledIds.push('analytics')
  if (comp) enabledIds.push('compliance')

  return <FeaturesContent enabledIds={enabledIds} />
}
