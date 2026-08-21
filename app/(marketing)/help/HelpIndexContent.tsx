'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ARTICLES, CATEGORIES, searchIndex, type KbArticle } from './content'
import styles from './Help.module.css'

export default function HelpIndexContent() {
  const [query, setQuery] = useState('')

  const index = useMemo(
    () => ARTICLES.map((a) => ({ article: a, haystack: searchIndex(a) })),
    [],
  )

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return null
    // Every word must appear somewhere, so "driver inspection" narrows rather
    // than widening the way an OR match would.
    const words = q.split(/\s+/)
    return new Set(
      index
        .filter(({ haystack }) => words.every((w) => haystack.includes(w)))
        .map(({ article }) => article.slug),
    )
  }, [index, query])

  const visible = (a: KbArticle) => matches === null || matches.has(a.slug)
  const total = matches === null ? ARTICLES.length : matches.size

  return (
    <>
      <div className={styles.searchWrap}>
        <input
          type="search"
          className={styles.search}
          placeholder="Search guides — try “inspection”, “defect”, “timesheet”"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search help guides"
        />
        <p className={styles.searchCount} role="status">
          {query.trim()
            ? `${total} ${total === 1 ? 'guide' : 'guides'} match “${query.trim()}”`
            : `${ARTICLES.length} guides`}
        </p>
      </div>

      {/* Orientation for first-timers. Hidden while searching, where it is noise. */}
      {!query.trim() && (
        <div className={styles.startHere}>
          <h2>New to qMechanic?</h2>
          <p>
            Most people start with inspections. These three guides take you from an empty
            system to drivers completing daily walkaround checks on their phones — read
            them in order.
          </p>
          <ol className={styles.startList}>
            <li>
              <Link href="/help/admin-inspections-setup">Set up inspections from scratch</Link>
              <span>Vehicle types, vehicles, people, then your first template.</span>
            </li>
            <li>
              <Link href="/help/admin-inspections">Working with inspection templates</Link>
              <span>What every field does, and how to change one safely.</span>
            </li>
            <li>
              <Link href="/help/admin-inspection-results">Reviewing inspections, defects and follow-up</Link>
              <span>Read the results, fix the faults, prove your compliance.</span>
            </li>
          </ol>
        </div>
      )}

      {total === 0 && (
        <p className={styles.noResults}>
          Nothing matched that. Try a single word, or{' '}
          <Link href="/support">contact support</Link>.
        </p>
      )}

      {CATEGORIES.map((cat) => {
        const articles = ARTICLES.filter((a) => a.audience === cat.key && visible(a))
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
    </>
  )
}
