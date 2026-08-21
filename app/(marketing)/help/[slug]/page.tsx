import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ARTICLES, CATEGORIES, getArticle } from '../content'
import styles from '../Help.module.css'

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return { title: 'Help — qMechanic' }
  return { title: `${article.title} — qMechanic Help`, description: article.summary }
}

export default async function HelpArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const category = CATEGORIES.find((c) => c.key === article.audience)

  return (
    <section className={styles.help}>
      <div className={styles.articleContainer}>
        <nav className={styles.breadcrumb}>
          <Link href="/help">Help</Link>
          <span aria-hidden="true"> / </span>
          <span>{category?.title}</span>
        </nav>

        <header className={styles.articleHead}>
          <h1>{article.title}</h1>
          <p className={styles.subtitle}>{article.summary}</p>
          {article.forWho && <p className={styles.forWho}>Who this is for: {article.forWho}</p>}
        </header>

        {article.sections.map((section, i) => (
          <div key={i} className={styles.section}>
            <h2>{section.heading}</h2>
            {section.intro && <p className={styles.sectionIntro}>{section.intro}</p>}
            {section.shots?.map((shot, s) => (
              <figure key={s} className={styles.shot}>
                {/* Plain <img> to match the rest of the site (no next/image here). */}
                <img src={`/help/admin/${shot.file}`} alt={shot.alt} loading="lazy" />
                {shot.caption && <figcaption>{shot.caption}</figcaption>}
              </figure>
            ))}
            {section.steps && section.steps.length > 0 && (
              <ol className={styles.steps}>
                {section.steps.map((step, j) => (
                  <li key={j}>{step}</li>
                ))}
              </ol>
            )}
            {section.notes?.map((note, k) => (
              <p key={k} className={styles.note}>
                <span className={styles.noteLabel}>Tip</span>
                {note}
              </p>
            ))}
          </div>
        ))}

        <div className={styles.articleFooter}>
          <Link href="/help" className={styles.backLink}>← All help guides</Link>
          <Link href="/support" className={styles.supportLink}>Still stuck? Contact support</Link>
        </div>
      </div>
    </section>
  )
}
