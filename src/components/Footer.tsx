import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>
              <div className={styles.logoIcon}>
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 16a8 8 0 1 1 16 0" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                  <circle cx="16" cy="16" r="3" fill="currentColor"/>
                  <path d="M16 13v-4M19 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <span>qMechanic</span>
            </Link>
            <p className={styles.tagline}>
              Modern Fleet Management.<br />
              Paper-Free Operations.
            </p>
          </div>

          <div className={styles.links}>
            <h4>Product</h4>
            <Link to="/features">Features</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/contact">Book Demo</Link>
          </div>

          <div className={styles.links}>
            <h4>Solutions</h4>
            <Link to="/features">Fleet Operators</Link>
            <Link to="/features">Workshops</Link>
            <Link to="/features">Equipment Rental</Link>
          </div>

          <div className={styles.links}>
            <h4>Company</h4>
            <Link to="/contact">Contact</Link>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            <span className="mono">&copy; {new Date().getFullYear()}</span> qMechanic. All rights reserved.
          </p>
          <div className={styles.badges}>
            <span className={styles.badge}>GDPR Compliant</span>
            <span className={styles.badge}>99.9% Uptime SLA</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
