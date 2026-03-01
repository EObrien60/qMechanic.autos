import { Link } from 'react-router-dom'
import { track } from '@vercel/analytics'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>
              <img src="/qmlogo_darkmode.png" alt="qMechanic" className={styles.logoImg} />
              <span>qMechanic</span>
            </Link>
            <p className={styles.tagline}>
              Modern Fleet Management.<br />
              Paper-Free Operations.
            </p>
            <a
              href="https://apps.apple.com/app/qmechanic"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.appStoreBadge}
              onClick={() => track('App Store Click', { location: 'footer' })}
            >
              <img src="/app-store-badge.svg" alt="Download on the App Store" />
            </a>
          </div>

          <div className={styles.links}>
            <h4>Product</h4>
            <Link to="/features" onClick={() => track('Footer Link Click', { label: 'Features', section: 'product' })}>Features</Link>
            <Link to="/pricing" onClick={() => track('Footer Link Click', { label: 'Pricing', section: 'product' })}>Pricing</Link>
            <Link to="/contact" onClick={() => track('Footer Link Click', { label: 'Book Demo', section: 'product' })}>Book Demo</Link>
          </div>

          <div className={styles.links}>
            <h4>Company</h4>
            <Link to="/contact" onClick={() => track('Footer Link Click', { label: 'Contact', section: 'company' })}>Contact</Link>
            <Link to="/support" onClick={() => track('Footer Link Click', { label: 'Support', section: 'company' })}>Support</Link>
            <Link to="/privacy" onClick={() => track('Footer Link Click', { label: 'Privacy Policy', section: 'company' })}>Privacy Policy</Link>
            <Link to="/terms" onClick={() => track('Footer Link Click', { label: 'Terms of Service', section: 'company' })}>Terms of Service</Link>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            <span className="mono">&copy; {new Date().getFullYear()}</span> qMechanic. All rights reserved.
          </p>
          <div className={styles.badges}>
            <span className={styles.badge}>GDPR Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
