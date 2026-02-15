import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './Home.module.css'

const homeFeatures = [
  {
    id: 'job-cards',
    title: 'Digital Job Cards',
    description: 'Replace paper with structured digital workflows. Capture photos, signatures, and notes in real-time.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'inspections',
    title: 'Compliance Tracking',
    description: 'Automated NCT/CVRT scheduling, inspection checklists, and audit-ready documentation.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'ai-invoices',
    title: 'AI Invoice Capture',
    description: 'Photograph invoices and let AI extract parts, costs, and supplier details automatically.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'fleet-tracking',
    title: 'Live Fleet Tracking',
    description: 'Real-time GPS integration, geofencing alerts, and route optimization for your entire fleet.',
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
    description: 'Cost-per-km breakdowns, maintenance trends, and predictive insights across your operation.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'compliance',
    title: 'Secure & Compliant',
    description: 'Role-based access, encrypted data, and full audit trails. GDPR and industry compliant.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

export default function Home() {
  const [enabledIds, setEnabledIds] = useState<Set<string>>(new Set(homeFeatures.map(f => f.id)))

  useEffect(() => {
    fetch('/api/flags')
      .then(res => res.json())
      .then(data => {
        if (data.flags) {
          const enabled = new Set(
            data.flags.filter((f: { enabled: boolean }) => f.enabled).map((f: { id: string }) => f.id)
          )
          setEnabledIds(enabled)
        }
      })
      .catch(() => {})
  }, [])

  const visibleFeatures = homeFeatures.filter(f => enabledIds.has(f.id))

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroGrid} />
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>
              <span className={styles.badgeDot} />
              <span className="mono">Now available in Ireland & the UK</span>
            </div>
            <h1 className={styles.title}>
              Fleet Management.<br />
              <span className={styles.accent}>Precision Engineered.</span>
            </h1>
            <p className={styles.subtitle}>
              Digital job cards, automated compliance tracking, and AI-powered invoice
              processing. Replace paper with a system built for modern workshops.
            </p>
            <div className={styles.heroCta}>
              <Link to="/contact" className="btn btn-primary">
                Book a Demo
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/features" className="btn btn-secondary">
                Explore Features
              </Link>
            </div>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statValue}>2.4M+</span>
                <span className={styles.statLabel}>Job Cards Processed</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statValue}>340+</span>
                <span className={styles.statLabel}>Fleet Operators</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statValue}>99.9%</span>
                <span className={styles.statLabel}>Uptime SLA</span>
              </div>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.appShowcase}>
              <div className={styles.phoneFrame}>
                <img src="/app/inspection.png" alt="Vehicle inspection" />
              </div>
              <div className={styles.phoneFrame + ' ' + styles.phoneCenter}>
                <img src="/app/dashboard.png" alt="qMechanic dashboard" />
              </div>
              <div className={styles.phoneFrame}>
                <img src="/app/job-detail.png" alt="Job card detail" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className={styles.features}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Core Capabilities</span>
            <h2>Everything your fleet needs.<br />Nothing it doesn't.</h2>
          </div>
          <div className={styles.featureGrid}>
            {visibleFeatures.map(feature => (
              <div key={feature.id} className={styles.featureCard}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className={styles.proof}>
        <div className={styles.container}>
          <div className={styles.proofGrid}>
            <div className={styles.proofContent}>
              <span className={styles.sectionTag}>Why qMechanic</span>
              <h2>Built for operators who demand precision.</h2>
              <blockquote className={styles.quote}>
                "Go paperless, stay compliant, and get full visibility across your fleet operations
                &mdash; all from one platform built for the workshop floor."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaCard}>
            <div className={styles.ctaContent}>
              <h2>Ready to modernize your fleet operations?</h2>
              <p>Book a personalized demo and see how qMechanic can transform your workshop.</p>
            </div>
            <div className={styles.ctaActions}>
              <Link to="/contact" className="btn btn-primary">
                Book Demo
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <span className={styles.ctaNote}>Free 14-day trial • No credit card required</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
