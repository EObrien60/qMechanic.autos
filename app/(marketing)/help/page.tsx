import type { Metadata } from 'next'
import HelpIndexContent from './HelpIndexContent'
import styles from './Help.module.css'

export const metadata: Metadata = {
  title: 'Help & Knowledge Base — qMechanic',
  description: 'Step-by-step guides for the qMechanic mobile app and admin console.',
}

export default function HelpIndex() {
  return (
    <section className={styles.help}>
      <div className={styles.container}>
        <header className={styles.hero}>
          <span className={styles.tag}>Knowledge base</span>
          <h1>Help &amp; guides</h1>
          <p className={styles.subtitle}>
            Everything you need to use qMechanic — clear, step-by-step. Pick the app you’re using.
          </p>
        </header>

        <HelpIndexContent />
      </div>
    </section>
  )
}
