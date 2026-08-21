import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ARTICLES, CATEGORIES, getArticle, neighbours, sectionId } from '../content'
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
  const { prev, next } = neighbours(slug)

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

        {article.sections.length > 2 && (
          <nav className={styles.toc} aria-label="On this page">
            <p className={styles.tocTitle}>On this page</p>
            <ol>
              {article.sections.map((section) => (
                <li key={section.heading}>
                  <a href={`#${sectionId(section.heading)}`}>{section.heading}</a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {article.sections.map((section, i) => (
          <div key={i} className={styles.section}>
            <h2 id={sectionId(section.heading)}>{section.heading}</h2>
            {section.intro && <p className={styles.sectionIntro}>{section.intro}</p>}
            {section.shots?.map((shot, s) => (
              <figure key={s} className={shot.phone ? `${styles.shot} ${styles.shotPhone}` : styles.shot}>
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

        {(prev || next) && (
          <nav className={styles.pager} aria-label="More guides">
            {prev ? (
              <Link href={`/help/${prev.slug}`} className={styles.pagerPrev}>
                <span>← Previous</span>
                <strong>{prev.title}</strong>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link href={`/help/${next.slug}`} className={styles.pagerNext}>
                <span>Next →</span>
                <strong>{next.title}</strong>
              </Link>
            )}
          </nav>
        )}

        <div className={styles.articleFooter}>
          <Link href="/help" className={styles.backLink}>← All help guides</Link>
          <Link href="/support" className={styles.supportLink}>Still stuck? Contact support</Link>
        </div>
      </div>
    </section>
  )
}
