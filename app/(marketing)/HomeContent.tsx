'use client'

import Link from 'next/link'
import { track } from '@vercel/analytics'
import styles from './Home.module.css'

const homeFeatures = [
  {
    id: 'waterfall',
    title: 'The Waterfall',
    description:
      'Our legendary 30-foot indoor waterfall is the heart of Casa Bonita. Watch fearless cliff divers leap from the rocks above into the pool below.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path
          d="M12 3v10m0 0c0 2-2 4-4 6m4-6c0 2 2 4 4 6M3 20h18"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 'cliff-divers',
    title: 'Cliff Divers',
    description:
      'Our world-famous cliff divers perform breathtaking dives throughout the evening. Every meal comes with a show you\'ll never forget.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path
          d="M12 2a3 3 0 110 6 3 3 0 010-6zm0 6v4l4 4m-4-4l-4 4m4 0v6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 'food',
    title: 'Mexican Cuisine',
    description:
      'Savor authentic Mexican dishes — enchiladas, tacos, burritos, and our legendary sopapillas drizzled with honey. Food that\'s as memorable as the show.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'cave',
    title: "Black Bart's Cave",
    description:
      'Explore the mysterious caverns of Black Bart\'s Cave. A wandering adventure through tunnels, passages, and surprises at every turn.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 'entertainment',
    title: 'Live Entertainment',
    description:
      'Puppet shows, magicians, strolling mariachi bands, and more. The entertainment never stops at Casa Bonita — it\'s a full evening of wonder.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path
          d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 'legacy',
    title: 'A Colorado Legend',
    description:
      'Open since 1974, lovingly restored by Matt Stone & Trey Parker. Casa Bonita is more than a restaurant — it\'s a Colorado tradition.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
]

export default function HomeContent() {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroGrid} />
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>
              <span className={styles.badgeDot} />
              <span className="mono">Now Open in Lakewood, Colorado</span>
            </div>
            <h1 className={styles.title}>
              Casa Bonita.<br />
              <span className={styles.accent}>The Legend Lives On.</span>
            </h1>
            <p className={styles.subtitle}>
              Denver&apos;s most iconic dining and entertainment destination. Indoor waterfall, fearless cliff divers,
              authentic Mexican cuisine, and memories that last a lifetime.
            </p>
            <div className={styles.heroCta}>
              <Link
                href="/contact"
                className="btn btn-primary"
                onClick={() => track('CTA Click', { label: 'Reserve a Table', location: 'hero' })}
              >
                Reserve a Table
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10m0 0L9 4m4 4L9 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link
                href="/features"
                className="btn btn-secondary"
                onClick={() => track('CTA Click', { label: 'Explore Experience', location: 'hero' })}
              >
                Explore the Experience
              </Link>
            </div>
            <div className={styles.heroMeta} style={{ marginTop: '1.5rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <span className="mono" style={{ fontSize: '0.8rem', opacity: 0.6 }}>📍 6715 W Colfax Ave, Lakewood CO</span>
              <span className="mono" style={{ fontSize: '0.8rem', opacity: 0.6 }}>⏰ Wed–Sun, starting at 4pm</span>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.appShowcase}>
              <div className={styles.phoneFrame} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.15)', borderRadius: '1rem', padding: '2rem', aspectRatio: '9/16', maxWidth: '180px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🌊</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>The Waterfall</div>
                </div>
              </div>
              <div className={`${styles.phoneFrame} ${styles.phoneCenter}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)', borderRadius: '1rem', padding: '2rem', aspectRatio: '9/16', maxWidth: '200px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>🌮</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>Mexican Cuisine</div>
                </div>
              </div>
              <div className={styles.phoneFrame} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.15)', borderRadius: '1rem', padding: '2rem', aspectRatio: '9/16', maxWidth: '180px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎭</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>Entertainment</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className={styles.features}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>What Awaits You</span>
            <h2>More than a restaurant.<br />An entire world to explore.</h2>
          </div>
          <div className={styles.featureGrid}>
            {homeFeatures.map(feature => (
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
              <span className={styles.sectionTag}>The Casa Bonita Experience</span>
              <h2>Where every dinner becomes a story worth telling.</h2>
              <blockquote className={styles.quote}>
                &ldquo;Casa Bonita is not just a restaurant — it&apos;s a place where you walk in and leave the real world
                behind. The waterfall, the divers, the sopapillas... there is truly nothing else like it on Earth.&rdquo;
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
              <h2>Ready for an unforgettable evening?</h2>
              <p>Reserve your table at Casa Bonita and experience the legend for yourself.</p>
            </div>
            <div className={styles.ctaActions}>
              <Link
                href="/contact"
                className="btn btn-primary"
                onClick={() =>
                  track('CTA Click', { label: 'Reserve a Table', location: 'home-bottom' })
                }
              >
                Reserve a Table
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10m0 0L9 4m4 4L9 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <span className={styles.ctaNote}>Open Wednesday–Sunday &bull; Lakewood, Colorado</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
