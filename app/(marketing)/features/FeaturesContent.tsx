'use client'

import Link from 'next/link'
import { track } from '@vercel/analytics'
import styles from './Features.module.css'

const features = [
  {
    id: 'job-cards',
    title: 'Digital Job Cards',
    description: 'Replace paper-based workflows with structured digital job cards that capture every detail.',
    details: [
      'Customizable job templates for different service types',
      'Photo and document attachments with annotations',
      'Digital signatures from technicians and customers',
      'Real-time status updates and notifications',
      'Full job history and audit trail',
    ],
    images: ['/app/job-detail.png', '/app/job-signoff.png'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'inspections',
    title: 'Pre-Trip & Safety Inspections',
    description: 'Ensure compliance with structured digital inspection checklists for every vehicle.',
    details: [
      'Configurable inspection templates by vehicle type',
      'Pass/fail scoring with defect flagging',
      'Photo evidence for identified issues',
      'Automatic escalation for critical defects',
      'Compliance reporting and analytics',
    ],
    images: ['/app/inspection.png', '/app/inspection-summary.png'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'ai-invoices',
    title: 'AI Invoice Processing',
    description: 'Photograph invoices and let AI extract parts, costs, and supplier details automatically.',
    details: [
      'OCR-powered text extraction from photos',
      'Automatic line item parsing and categorization',
      'Supplier database matching and creation',
      'Cost allocation to jobs and vehicles',
      'Export to accounting systems',
    ],
    images: ['/app/ai-invoice-parser.png'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'fleet-tracking',
    title: 'Live Fleet Tracking',
    description: 'Real-time visibility into your entire fleet with GPS integration and geofencing.',
    details: [
      'Real-time GPS tracking and mapping',
      'Geofence alerts for site entry/exit',
      'Route history and playback',
      'Driver behavior monitoring',
      'Integration with major telematics providers',
    ],
    images: ['/app/dashboard.png'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'analytics',
    title: 'Fleet Analytics',
    description: 'Deep insights into costs, maintenance trends, and operational efficiency.',
    details: [
      'Cost-per-kilometer breakdowns by vehicle',
      'Maintenance trend analysis and predictions',
      'Fuel consumption tracking and anomaly detection',
      'Downtime analysis and optimization',
      'Custom report builder and scheduling',
    ],
    images: ['/app/ai-chat.png', '/app/timesheet.png'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'compliance',
    title: 'Compliance Management',
    description: 'Stay audit-ready with automated scheduling and documentation.',
    details: [
      'NCT/CVRT expiry tracking and alerts',
      'Registration and license management',
      'Automated compliance checklists',
      'Document storage and versioning',
      'Audit trail and compliance reporting',
    ],
    images: ['/app/defects.png', '/app/inspection-fail.png'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

interface FeaturesContentProps {
  enabledIds: string[]
}

export default function FeaturesContent({ enabledIds }: FeaturesContentProps) {
  const enabledSet = new Set(enabledIds)
  const visibleFeatures = features.filter(f => enabledSet.has(f.id))

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.sectionTag}>Features</span>
          <h1>Built for the workshop floor.</h1>
          <p className={styles.heroSubtitle}>
            Every feature designed with input from fleet operators, workshop managers, and mechanics who live this every day.
          </p>
        </div>
      </section>

      {/* Features List */}
      <section className={styles.features}>
        <div className={styles.container}>
          {visibleFeatures.map((feature, index) => (
            <div
              key={feature.id}
              className={`${styles.featureRow} ${index % 2 === 1 ? styles.reversed : ''}`}
            >
              <div className={styles.featureContent}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h2>{feature.title}</h2>
                <p className={styles.featureDescription}>{feature.description}</p>
                <ul className={styles.featureList}>
                  {feature.details.map((detail, i) => (
                    <li key={i}>
                      <span className={styles.checkIcon}>
                        <svg viewBox="0 0 16 16" fill="none">
                          <path d="M3 8l4 4 6-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.featureVisual}>
                {feature.images.length > 0 ? (
                  <div className={styles.phoneShowcase}>
                    {feature.images.map((img, i) => (
                      <div key={i} className={styles.phoneFrame}>
                        <img src={img} alt={`${feature.title} screenshot`} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.visualPlaceholder}>
                    <div className={styles.visualIcon}>{feature.icon}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaCard}>
            <h2>See it in action</h2>
            <p>Book a personalized demo tailored to your fleet size and needs.</p>
            <Link
              href="/contact"
              className="btn btn-primary"
              onClick={() => track('CTA Click', { label: 'Book Demo', location: 'features-bottom' })}
            >
              Book Demo
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
