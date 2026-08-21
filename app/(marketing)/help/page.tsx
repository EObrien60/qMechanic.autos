import Link from 'next/link'
import type { Metadata } from 'next'
import { CATEGORIES, articlesFor } from './content'
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

        {CATEGORIES.map((cat) => {
          const articles = articlesFor(cat.key)
          if (articles.length === 0) return null
          return (
            <div key={cat.key} className={styles.category}>
              <div className={styles.categoryHead}>
                <h2>{cat.title}</h2>
                <p>{cat.blurb}</p>
              </div>
              <div className={styles.grid}>
                {articles.map((a) => (
                  <Link key={a.slug} href={`/help/${a.slug}`} className={styles.card}>
                    <h3>{a.title}</h3>
                    <p>{a.summary}</p>
                    <span className={styles.cardLink}>Read guide →</span>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
