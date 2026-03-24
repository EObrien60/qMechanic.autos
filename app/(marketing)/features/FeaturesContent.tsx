'use client'

import Link from 'next/link'
import { track } from '@vercel/analytics'
import styles from './Features.module.css'

const features = [
  {
    id: 'waterfall',
    title: 'The Legendary Waterfall',
    description: 'The crown jewel of Casa Bonita — a thundering 30-foot indoor waterfall that you have to see to believe.',
    details: [
      'Towering 30-foot waterfall cascading inside the building',
      'Fearless cliff divers perform daring leaps throughout the evening',
      'Tropical scenery and lush surroundings transport you to another world',
      'The roar of the waterfall fills the entire dining room',
      'The most photographed spot in all of Colorado dining',
    ],
    images: [],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3v10m0 0c0 2-2 4-4 6m4-6c0 2 2 4 4 6M3 20h18" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'cliff-divers',
    title: 'Cliff Divers',
    description: 'Our world-famous cliff divers are the heart of the Casa Bonita experience — performing daring, acrobatic dives from the rocky cliffs above the waterfall pool.',
    details: [
      'Trained professional cliff divers performing multiple shows per evening',
      'Acrobatic dives from heights over 30 feet',
      'Shows timed throughout your meal so you never miss one',
      'The tradition stretches back to Casa Bonita\'s founding in 1974',
      'A spectacle unlike anything else in the world',
    ],
    images: [],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a3 3 0 110 6 3 3 0 010-6zm-1 6v5l-3 4m4-9v5l3 4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'food',
    title: 'Authentic Mexican Cuisine',
    description: 'From classic enchiladas to our legendary honey-drizzled sopapillas, every dish is crafted to complement an evening of wonder.',
    details: [
      'Enchiladas, tacos, burritos, and combination platters',
      'Freshly made sopapillas with honey — a Casa Bonita staple',
      'Hearty queso, guacamole, and classic appetizers',
      'Full bar with margaritas, Mexican beers, and cocktails',
      'Kids\' menus and options for the whole family',
    ],
    images: [],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'cave',
    title: "Black Bart's Cave",
    description: 'Wander through the mysterious tunnels and caverns of Black Bart\'s Cave — an adventure within an adventure hidden deep inside Casa Bonita.',
    details: [
      'Sprawling cave tunnels wind through the heart of the building',
      'Themed scenery and surprises lurk around every bend',
      'A rite of passage for every Casa Bonita visitor',
      'Secret passages and hidden rooms to discover',
      'The cave that launched a thousand childhood memories',
    ],
    images: [],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'entertainment',
    title: 'Live Entertainment',
    description: 'The fun doesn\'t stop at the waterfall. Casa Bonita is packed with roving performers, live music, and shows that keep the magic alive all evening.',
    details: [
      'Strolling mariachi bands serenading tables',
      'Puppet shows and theatrical performances',
      'Magicians and close-up magic throughout the venue',
      'Themed skits and comedy acts',
      'Entertainment scheduled throughout the entire evening',
    ],
    images: [],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'legacy',
    title: 'A Colorado Icon',
    description: 'Opened in 1974 and lovingly restored by South Park creators Matt Stone and Trey Parker, Casa Bonita is more than a restaurant — it\'s Colorado history.',
    details: [
      'Founded in 1974 — over 50 years of Colorado tradition',
      'Fully restored and reopened in June 2023',
      'Owned and preserved by Matt Stone & Trey Parker',
      'Famously featured in the South Park episode "Casa Bonita"',
      'The iconic pink tower has been a Denver landmark for generations',
    ],
    images: [],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

export default function FeaturesContent() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.sectionTag}>The Experience</span>
          <h1>Step inside the legend.</h1>
          <p className={styles.heroSubtitle}>
            Casa Bonita is not just a restaurant — it&apos;s an entire world. From the roaring waterfall to the winding caves, every corner holds a new discovery.
          </p>
        </div>
      </section>

      {/* Features List */}
      <section className={styles.features}>
        <div className={styles.container}>
          {features.map((feature, index) => (
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
                <div className={styles.visualPlaceholder}>
                  <div className={styles.visualIcon}>{feature.icon}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaCard}>
            <h2>Ready to experience it yourself?</h2>
            <p>Reserve your table and make a night you&apos;ll never forget.</p>
            <Link
              href="/contact"
              className="btn btn-primary"
              onClick={() => track('CTA Click', { label: 'Reserve a Table', location: 'experience-bottom' })}
            >
              Reserve a Table
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
