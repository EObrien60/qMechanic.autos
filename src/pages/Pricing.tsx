import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './Pricing.module.css'

interface PricingTier {
  id: string
  name: string
  description: string
  price_monthly: number
  price_yearly: number
  features: string[]
  highlighted: boolean
  cta_text: string
}

const defaultTiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'For small workshops and owner-operators',
    price_monthly: 49,
    price_yearly: 470,
    features: [
      'Up to 10 vehicles',
      'Digital job cards',
      'Basic inspections',
      'Email support',
      '1 user seat',
    ],
    highlighted: false,
    cta_text: 'Start Free Trial',
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'For growing fleets and workshops',
    price_monthly: 149,
    price_yearly: 1430,
    features: [
      'Up to 50 vehicles',
      'Everything in Starter',
      'AI invoice processing',
      'Fleet analytics',
      'Priority support',
      '5 user seats',
    ],
    highlighted: true,
    cta_text: 'Start Free Trial',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large operations with complex needs',
    price_monthly: 399,
    price_yearly: 3830,
    features: [
      'Unlimited vehicles',
      'Everything in Professional',
      'Live GPS tracking',
      'Custom integrations',
      'Dedicated account manager',
      'Unlimited users',
      'SLA guarantee',
    ],
    highlighted: false,
    cta_text: 'Contact Sales',
  },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(true)
  const [tiers, setTiers] = useState<PricingTier[]>(defaultTiers)

  useEffect(() => {
    fetch('/api/pricing')
      .then(res => res.json())
      .then(data => {
        if (data.tiers && data.tiers.length > 0) {
          setTiers(data.tiers)
        }
      })
      .catch(() => {
        // Use default tiers on error
      })
  }, [])

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.sectionTag}>Pricing</span>
          <h1>Simple, transparent pricing</h1>
          <p className={styles.heroSubtitle}>
            No hidden fees. No long-term contracts. Scale as your fleet grows.
          </p>

          <div className={styles.toggle}>
            <button
              className={`${styles.toggleBtn} ${!annual ? styles.active : ''}`}
              onClick={() => setAnnual(false)}
            >
              Monthly
            </button>
            <button
              className={`${styles.toggleBtn} ${annual ? styles.active : ''}`}
              onClick={() => setAnnual(true)}
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
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={`${styles.pricingCard} ${tier.highlighted ? styles.highlighted : ''}`}
              >
                {tier.highlighted && (
                  <div className={styles.popularBadge}>Most Popular</div>
                )}
                <div className={styles.cardHeader}>
                  <h3>{tier.name}</h3>
                  <p>{tier.description}</p>
                </div>
                <div className={styles.priceBlock}>
                  <span className={styles.currency}>&euro;</span>
                  <span className={styles.price}>
                    {annual ? Math.round(tier.price_yearly / 12) : tier.price_monthly}
                  </span>
                  <span className={styles.period}>/month</span>
                </div>
                {annual && (
                  <p className={styles.billedAnnually}>
                    Billed annually (&euro;{tier.price_yearly}/year)
                  </p>
                )}
                <ul className={styles.featureList}>
                  {tier.features.map((feature, i) => (
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
                  className={`btn ${tier.highlighted ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ width: '100%' }}
                >
                  {tier.cta_text}
                </Link>
              </div>
            ))}
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
              <p>Yes! All plans come with a 14-day free trial. No credit card required to get started.</p>
            </div>
            <div className={styles.faqItem}>
              <h4>Can I change plans later?</h4>
              <p>Absolutely. You can upgrade or downgrade at any time. Changes take effect on your next billing cycle.</p>
            </div>
            <div className={styles.faqItem}>
              <h4>What payment methods do you accept?</h4>
              <p>We accept all major credit cards, direct debit, and can arrange invoicing for Enterprise customers.</p>
            </div>
            <div className={styles.faqItem}>
              <h4>Is my data secure?</h4>
              <p>Yes. We use bank-level encryption, regular backups, and are GDPR compliant. Your data is yours.</p>
            </div>
            <div className={styles.faqItem}>
              <h4>Do you offer training?</h4>
              <p>All plans include onboarding support. Professional and Enterprise plans include dedicated training sessions.</p>
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
            <h2>Not sure which plan is right?</h2>
            <p>Let's talk. We'll help you find the perfect fit for your operation.</p>
            <Link to="/contact" className="btn btn-primary">
              Book a Demo
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
