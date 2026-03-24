'use client'

import Link from 'next/link'
import { track } from '@vercel/analytics'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <span>Casa Bonita</span>
            </Link>
            <p className={styles.tagline}>
              Denver&apos;s Most Legendary<br />
              Dining &amp; Entertainment Experience.
            </p>
            <p style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '0.5rem' }}>
              6715 W Colfax Ave<br />Lakewood, CO 80214
            </p>
          </div>

          <div className={styles.links}>
            <h4>Visit</h4>
            <Link href="/features" onClick={() => track('Footer Link Click', { label: 'Experience', section: 'visit' })}>Experience</Link>
            <Link href="/pricing" onClick={() => track('Footer Link Click', { label: 'Menu', section: 'visit' })}>Menu</Link>
            <Link href="/contact" onClick={() => track('Footer Link Click', { label: 'Reservations', section: 'visit' })}>Reservations</Link>
          </div>

          <div className={styles.links}>
            <h4>Info</h4>
            <Link href="/contact" onClick={() => track('Footer Link Click', { label: 'Contact', section: 'info' })}>Contact Us</Link>
            <Link href="/privacy" onClick={() => track('Footer Link Click', { label: 'Privacy Policy', section: 'info' })}>Privacy Policy</Link>
            <Link href="/terms" onClick={() => track('Footer Link Click', { label: 'Terms', section: 'info' })}>Terms of Service</Link>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            <span className="mono">&copy; {new Date().getFullYear()}</span> Casa Bonita. All rights reserved.
          </p>
          <div className={styles.bottomRight}>
            <div className={styles.badges}>
              <span className={styles.badge}>Lakewood, Colorado</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
