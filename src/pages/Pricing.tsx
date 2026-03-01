import { useState } from 'react'
import { Link } from 'react-router-dom'
import { track } from '@vercel/analytics'
import styles from './Pricing.module.css'

interface Role {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  price_monthly: number
  features: string[]
  highlighted: boolean
}

const roles: Role[] = [
  {
    id: 'admin',
    name: 'Admin',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    description: 'Full platform access for managers and operations leads',
    price_monthly: 35,
    features: [
      'Admin portal & dashboard',
      'Reporting & analytics',
      'AI invoice processing',
      'AI chat assistant',
      'System configuration',
      'User management',
    ],
    highlighted: false,
  },
  {
    id: 'technician',
    name: 'Technician',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    description: 'Workshop tools for mechanics and service technicians',
    price_monthly: 22,
    features: [
      'Digital job cards',
      'Workshop workflow',
      'Inspections & defects',
      'Timesheets',
      'Photo attachments',
      'Digital sign-off',
    ],
    highlighted: true,
  },
  {
    id: 'driver',
    name: 'Driver',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="12 6 12 12 16 14" />
      </svg>
    ),
    description: 'Essential tools for drivers and field operators',
    price_monthly: 8,
    features: [
      'Walk-around inspections',
      'Defect logging',
      'Timesheets',
      'Mobile-first interface',
    ],
    highlighted: false,
  },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(true)

  const getPrice = (monthly: number) => {
    if (annual) return Math.round(monthly * 0.8)
    return monthly
  }

  const getYearlyTotal = (monthly: number) => {
    return Math.round(monthly * 0.8 * 12)
  }

  // Example fleet: 3 admins + 10 techs + 50 drivers
  const exampleMonthly = 3 * 35 + 10 * 22 + 50 * 8
  const exampleAnnual = Math.round(exampleMonthly * 0.8 * 12)

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.sectionTag}>Pricing</span>
          <h1>Pay per seat, not per vehicle</h1>
          <p className={styles.heroSubtitle}>
            Only pay for the roles you need. Simple, scalable pricing built for real fleets.
          </p>

          <div className={styles.toggle}>
            <button
              className={`${styles.toggleBtn} ${!annual ? styles.active : ''}`}
              onClick={() => { track('Billing Toggle', { period: 'monthly' }); setAnnual(false) }}
            >
              Monthly
            </button>
            <button
              className={`${styles.toggleBtn} ${annual ? styles.active : ''}`}
              onClick={() => { track('Billing Toggle', { period: 'annual' }); setAnnual(true) }}
            >
              Annual
              <span className={styles.saveBadge}>Save 20%</span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className={styles.pricing}>
        <div className={styles.container}>
          <div className={styles.pricingGrid}>
            {roles.map((role) => (
              <div
                key={role.id}
                className={`${styles.pricingCard} ${role.highlighted ? styles.highlighted : ''}`}
              >
                {role.highlighted && (
                  <div className={styles.popularBadge}>Most Common</div>
                )}
                <div className={styles.cardHeader}>
                  <div className={styles.roleIcon}>{role.icon}</div>
                  <h3>{role.name}</h3>
                  <p>{role.description}</p>
                </div>
                <div className={styles.priceBlock}>
                  <span className={styles.currency}>&euro;</span>
                  <span className={styles.price}>{getPrice(role.price_monthly)}</span>
                  <span className={styles.period}>/user/month</span>
                </div>
                {annual && (
                  <p className={styles.billedAnnually}>
                    Billed annually (&euro;{getYearlyTotal(role.price_monthly)}/user/year)
                  </p>
                )}
                {!annual && (
                  <p className={styles.billedAnnually}>
                    &euro;{role.price_monthly * 12}/user/year billed monthly
                  </p>
                )}
                <ul className={styles.featureList}>
                  {role.features.map((feature, i) => (
                    <li key={i}>
                      <span className={styles.checkIcon}>
                        <svg viewBox="0 0 16 16" fill="none">
                          <path d="M3 8l4 4 6-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`btn ${role.highlighted ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ width: '100%' }}
                  onClick={() => track('Pricing CTA Click', { role: role.name, period: annual ? 'annual' : 'monthly' })}
                >
                  Start Free Trial
                </Link>
              </div>
            ))}
          </div>

          {/* Example Calculator */}
          <div className={styles.calculator}>
            <div className={styles.calcInner}>
              <h3>Example: Mid-size fleet</h3>
              <div className={styles.calcGrid}>
                <div className={styles.calcRow}>
                  <span className={styles.calcRole}>3 Admins</span>
                  <span className={styles.calcMath}>3 &times; &euro;{getPrice(35)} &times; 12</span>
                  <span className={styles.calcResult}>&euro;{3 * getPrice(35) * 12}</span>
                </div>
                <div className={styles.calcRow}>
                  <span className={styles.calcRole}>10 Technicians</span>
                  <span className={styles.calcMath}>10 &times; &euro;{getPrice(22)} &times; 12</span>
                  <span className={styles.calcResult}>&euro;{10 * getPrice(22) * 12}</span>
                </div>
                <div className={styles.calcRow}>
                  <span className={styles.calcRole}>50 Drivers</span>
                  <span className={styles.calcMath}>50 &times; &euro;{getPrice(8)} &times; 12</span>
                  <span className={styles.calcResult}>&euro;{50 * getPrice(8) * 12}</span>
                </div>
                <div className={`${styles.calcRow} ${styles.calcTotal}`}>
                  <span className={styles.calcRole}>Total per year</span>
                  <span className={styles.calcMath}>63 users</span>
                  <span className={styles.calcResult}>
                    &euro;{annual ? (3 * getPrice(35) + 10 * getPrice(22) + 50 * getPrice(8)) * 12 : exampleMonthly * 12}
                  </span>
                </div>
              </div>
              {annual && (
                <p className={styles.calcSaving}>
                  You save &euro;{exampleMonthly * 12 - exampleAnnual}/year with annual billing
                </p>
              )}
            </div>
          </div>

          {/* Trust Signals */}
          <div className={styles.trustRow}>
            <div className={styles.trustItem}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.trustIcon}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>14-day free trial</span>
            </div>
            <div className={styles.trustItem}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.trustIcon}>
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>No long-term contracts</span>
            </div>
            <div className={styles.trustItem}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.trustIcon}>
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Volume discounts for 100+ users</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faq}>
        <div className={styles.container}>
          <span className={styles.sectionTag}>FAQ</span>
          <h2>Common questions</h2>
          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <h4>Is there a free trial?</h4>
              <p>Yes! Every account starts with a 14-day free trial. No credit card required to get started.</p>
            </div>
            <div className={styles.faqItem}>
              <h4>How does per-seat pricing work?</h4>
              <p>You only pay for the users you add. Each user is assigned a role (Admin, Technician, or Driver) and billed at that role's rate. Add or remove seats anytime.</p>
            </div>
            <div className={styles.faqItem}>
              <h4>Can I mix and match roles?</h4>
              <p>Absolutely. Most fleets need a few Admins, a team of Technicians, and Drivers. You only pay for what you use.</p>
            </div>
            <div className={styles.faqItem}>
              <h4>What payment methods do you accept?</h4>
              <p>We accept all major credit cards and direct debit. Invoice billing is available for larger accounts.</p>
            </div>
            <div className={styles.faqItem}>
              <h4>Is my data secure?</h4>
              <p>Yes. We use bank-level encryption, daily backups, and are fully GDPR compliant. Your data is yours.</p>
            </div>
            <div className={styles.faqItem}>
              <h4>Can I cancel anytime?</h4>
              <p>Yes, there are no long-term contracts. Cancel anytime and you won't be charged again.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaCard}>
            <h2>Not sure how many seats you need?</h2>
            <p>Let's talk. We'll help you find the right mix for your operation.</p>
            <Link to="/contact" className="btn btn-primary" onClick={() => track('CTA Click', { label: 'Book a Demo', location: 'pricing-bottom' })}>
              Book a Demo
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
