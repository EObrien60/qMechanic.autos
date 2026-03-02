'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { track } from '@vercel/analytics'
import styles from './AISavings.module.css'

const TOTAL_SLIDES = 9
const SWIPE_THRESHOLD = 50

export default function AISavings() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [maxSlideReached, setMaxSlideReached] = useState(0)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)

  // Track page view on mount
  useEffect(() => {
    track('AI Savings Page View', { source: 'landing' })
  }, [])

  // Track slide views for drop-off analysis
  useEffect(() => {
    track('AI Savings Slide View', {
      slide: currentSlide,
      slideLabel: slideLabels[currentSlide],
      maxReached: maxSlideReached,
    })

    if (currentSlide > maxSlideReached) {
      setMaxSlideReached(currentSlide)
    }
  }, [currentSlide]) // eslint-disable-line react-hooks/exhaustive-deps

  // Track when user leaves page (for drop-off)
  useEffect(() => {
    const handleBeforeUnload = () => {
      track('AI Savings Exit', {
        lastSlide: currentSlide,
        lastSlideLabel: slideLabels[currentSlide],
        maxSlideReached,
        completedPercentage: Math.round((maxSlideReached / (TOTAL_SLIDES - 1)) * 100),
      })
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [currentSlide, maxSlideReached])

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < TOTAL_SLIDES) {
      setCurrentSlide(index)
    }
  }, [])

  const nextSlide = () => goToSlide(currentSlide + 1)
  const prevSlide = () => goToSlide(currentSlide - 1)

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        nextSlide()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prevSlide()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }) // intentionally re-binds on every render to capture current slide

  // Touch swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current
    const deltaY = e.changedTouches[0].clientY - touchStartY.current

    // Only swipe if horizontal movement is greater than vertical (avoid hijacking scroll)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > SWIPE_THRESHOLD) {
      if (deltaX < 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
  }

  // Scroll to top of slide container on slide change
  useEffect(() => {
    const container = document.querySelector('[data-slide-container]')
    if (container) {
      container.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [currentSlide])

  const progressPercent = ((currentSlide + 1) / TOTAL_SLIDES) * 100

  return (
    <>
      {/* Progress bar */}
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${progressPercent}%` }} />
      </div>

      {/* Step indicators */}
      <div className={styles.stepIndicators}>
        {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
          <button
            key={i}
            className={`${styles.stepDot} ${i === currentSlide ? styles.stepDotActive : ''} ${i < currentSlide ? styles.stepDotCompleted : ''}`}
            onClick={() => goToSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Slide content */}
      <div
        className={styles.page}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className={styles.slideContainer} data-slide-container>
          <div className={styles.slide} key={currentSlide}>
            {currentSlide === 0 && <SlideHook />}
            {currentSlide === 1 && <SlideProblem />}
            {currentSlide === 2 && <SlideInvoice />}
            {currentSlide === 3 && <SlideAIChat />}
            {currentSlide === 4 && <SlideWorkflow />}
            {currentSlide === 5 && <SlideCompliance />}
            {currentSlide === 6 && <SlideTotalImpact />}
            {currentSlide === 7 && <SlideROI />}
            {currentSlide === 8 && <SlideCTA />}
          </div>
        </div>

        {/* Navigation */}
        <div className={styles.nav}>
          <button
            className={`${styles.navBtn} ${currentSlide === 0 ? styles.navHidden : ''}`}
            onClick={prevSlide}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13 8H3m0 0l4-4M3 8l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>
          <span className={styles.slideCount}>{currentSlide + 1} / {TOTAL_SLIDES}</span>
          {currentSlide < TOTAL_SLIDES - 1 ? (
            <button className={`${styles.navBtn} ${styles.navBtnPrimary}`} onClick={nextSlide}>
              Continue
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ) : (
            <Link
              href="/contact"
              className={`${styles.navBtn} ${styles.navBtnPrimary}`}
              onClick={() => track('AI Savings CTA Click', { label: 'Book Demo', location: 'nav-final' })}
            >
              Book a Demo
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          )}
        </div>
      </div>
    </>
  )
}

const slideLabels = [
  'hook',
  'problem',
  'ai-invoicing',
  'ai-fleet-assistant',
  'workflow-automation',
  'compliance',
  'total-impact',
  'roi',
  'cta',
]

/* ========== Individual Slides ========== */

function SlideHook() {
  return (
    <div className={styles.hookSlide}>
      <div className={styles.hookTag}>
        <span>The AI Advantage</span>
      </div>
      <div className={styles.hookNumber}>15+</div>
      <h1 className={styles.hookTitle}>
        hours saved every week
      </h1>
      <p className={styles.hookSub}>
        Workshops and fleet owners are buried in manual work — invoicing, compliance tracking,
        reporting. AI changes that. Here&apos;s how.
      </p>
    </div>
  )
}

function SlideProblem() {
  const bars = [
    { label: 'Invoice processing', hours: 5, width: '62.5%' },
    { label: 'Compliance tracking', hours: 3.5, width: '43.75%' },
    { label: 'Job card admin', hours: 3, width: '37.5%' },
    { label: 'Reporting & analytics', hours: 2.5, width: '31.25%' },
    { label: 'Scheduling', hours: 2, width: '25%' },
  ]

  return (
    <div className={styles.problemSlide}>
      <div className={styles.slideHeader}>
        <span className={styles.sectionTag}>The Problem</span>
        <h2 className={styles.slideTitle}>Where your week disappears</h2>
        <p className={styles.slideSubtitle}>
          The average fleet workshop loses 16+ hours per week to manual admin tasks
          that AI can handle in minutes.
        </p>
      </div>

      <div className={styles.barChart}>
        {bars.map((bar, i) => (
          <div key={bar.label} className={styles.barRow}>
            <span className={styles.barLabel}>{bar.label}</span>
            <div className={styles.barTrack}>
              <div
                className={styles.barFill}
                style={{ width: bar.width, animationDelay: `${i * 0.1}s` }}
              >
                <span className={styles.barValue}>{bar.hours} hrs/wk</span>
              </div>
            </div>
          </div>
        ))}
        <div className={styles.barTotal}>
          <span className={styles.barTotalLabel}>Total manual admin time</span>
          <span className={styles.barTotalValue}>16 hrs/wk</span>
        </div>
      </div>
    </div>
  )
}

function SlideInvoice() {
  return (
    <div>
      <div className={styles.slideHeader}>
        <span className={styles.sectionTag}>AI Invoice Capture</span>
        <h2 className={styles.slideTitle}>From 12 minutes to 30 seconds</h2>
        <p className={styles.slideSubtitle}>
          Upload a supplier invoice — PDF or photo. AI reads every line item, extracts parts and costs, and links them to stock and jobs automatically.
        </p>
      </div>

      <div className={styles.comparisonGrid}>
        {/* Before */}
        <div className={styles.comparisonCard}>
          <span className={styles.comparisonLabel}>Before — Manual</span>
          <div className={styles.comparisonTime}>8–12</div>
          <div className={styles.comparisonUnit}>minutes per invoice</div>
          <ul className={styles.comparisonSteps}>
            <li>
              <span className={`${styles.stepIcon} ${styles.stepIconOld}`}>1</span>
              Receive paper or PDF invoice
            </li>
            <li>
              <span className={`${styles.stepIcon} ${styles.stepIconOld}`}>2</span>
              Manually key in each line item
            </li>
            <li>
              <span className={`${styles.stepIcon} ${styles.stepIconOld}`}>3</span>
              Cross-reference with purchase orders
            </li>
            <li>
              <span className={`${styles.stepIcon} ${styles.stepIconOld}`}>4</span>
              File and categorize the invoice
            </li>
            <li>
              <span className={`${styles.stepIcon} ${styles.stepIconOld}`}>5</span>
              Assign costs to the correct job
            </li>
          </ul>
        </div>

        {/* Divider */}
        <div className={styles.comparisonArrow}>
          <div className={styles.comparisonDividerLine} />
          <div className={styles.comparisonArrowIcon}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className={styles.savingsBadge}>93% faster</span>
          <div className={styles.comparisonDividerLine} />
        </div>

        {/* After */}
        <div className={`${styles.comparisonCard} ${styles.comparisonCardHighlight}`}>
          <span className={`${styles.comparisonLabel} ${styles.comparisonLabelAccent}`}>After — AI Powered</span>
          <div className={`${styles.comparisonTime} ${styles.comparisonTimeAccent}`}>~30</div>
          <div className={styles.comparisonUnit}>seconds per invoice</div>
          <ul className={styles.comparisonSteps}>
            <li>
              <span className={`${styles.stepIcon} ${styles.stepIconNew}`}>1</span>
              Upload a photo or PDF
            </li>
            <li>
              <span className={`${styles.stepIcon} ${styles.stepIconNew}`}>2</span>
              AI extracts all parts, prices, and totals
            </li>
            <li>
              <span className={`${styles.stepIcon} ${styles.stepIconNew}`}>3</span>
              Review, confirm, and it&apos;s linked to the job
            </li>
          </ul>
        </div>
      </div>

      {/* Invoice Parser Screenshot */}
      <div className={styles.screenshotFrame}>
        <img src="/app/ai-invoice-parser.png" alt="qMechanic AI Invoice Parser — upload a supplier invoice and AI extracts all parts data" />
        <div className={styles.screenshotCaption}>
          <span className={styles.screenshotCaptionDot} />
          qMechanic Invoice Parser — upload a PDF or image, AI does the rest
        </div>
      </div>
    </div>
  )
}

function SlideAIChat() {
  return (
    <div className={styles.chatSlide}>
      <div className={styles.splitLayout}>
        <div className={styles.splitContent}>
          <div className={styles.slideHeader}>
            <span className={styles.sectionTag}>AI Fleet Assistant</span>
            <h2 className={styles.slideTitle}>Ask your fleet anything</h2>
            <p className={styles.slideSubtitle}>
              A built-in AI assistant that understands your fleet data. Ask questions in plain English and get instant, structured answers — no reports to run, no spreadsheets to search.
            </p>
          </div>

          <div className={styles.chatFeatureList}>
            <div className={styles.chatFeature}>
              <div className={styles.chatFeatureIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className={styles.chatFeatureText}>
                <div className={styles.chatFeatureTitle}>Instant fleet queries</div>
                <div className={styles.chatFeatureDesc}>&ldquo;Which vehicles have unresolved defects?&rdquo; — answered in seconds with a full breakdown.</div>
              </div>
            </div>
            <div className={styles.chatFeature}>
              <div className={styles.chatFeatureIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className={styles.chatFeatureText}>
                <div className={styles.chatFeatureTitle}>On-demand summaries</div>
                <div className={styles.chatFeatureDesc}>Get dashboard summaries, cost breakdowns, and maintenance status without building a single report.</div>
              </div>
            </div>
            <div className={styles.chatFeature}>
              <div className={styles.chatFeatureIcon}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className={styles.chatFeatureText}>
                <div className={styles.chatFeatureTitle}>Conversational context</div>
                <div className={styles.chatFeatureDesc}>Full chat history so you can drill deeper — follow up, refine, and get to the answer fast.</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.splitVisual}>
          <div className={styles.screenshotFrame}>
            <img src="/app/ai-chat.png" alt="qMechanic AI Fleet Assistant — ask your fleet questions in natural language and get structured answers" />
            <div className={styles.screenshotCaption}>
              <span className={styles.screenshotCaptionDot} />
              Live AI assistant querying fleet defect data
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SlideWorkflow() {
  return (
    <div>
      <div className={styles.slideHeader}>
        <span className={styles.sectionTag}>Digital Workflows</span>
        <h2 className={styles.slideTitle}>Every job, structured and searchable</h2>
        <p className={styles.slideSubtitle}>
          Digital job cards replace paper trails. Photos, notes, parts, and sign-offs — captured once, available forever.
        </p>
      </div>

      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className={styles.metricValue}>6 min</div>
          <div className={styles.metricLabel}>Saved per job card</div>
          <p className={styles.metricDesc}>
            Structured templates eliminate re-entry. Techs tap, they don&apos;t type.
          </p>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className={styles.metricValue}>100%</div>
          <div className={styles.metricLabel}>Photo documentation</div>
          <p className={styles.metricDesc}>
            Every repair photographed and linked. No more missing evidence.
          </p>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className={styles.metricValue}>Instant</div>
          <div className={styles.metricLabel}>History lookup</div>
          <p className={styles.metricDesc}>
            Search any vehicle&apos;s full service history in seconds — not filing cabinets.
          </p>
        </div>
      </div>
    </div>
  )
}

function SlideCompliance() {
  const items = [
    {
      title: 'NCT / CVRT scheduling',
      desc: 'AI monitors every vehicle\u2019s test dates and flags upcoming deadlines weeks in advance. No spreadsheet tracking needed.',
      saving: '2 hrs/wk saved',
    },
    {
      title: 'Inspection checklists',
      desc: 'Guided, role-specific checklists ensure nothing gets missed. Results are timestamped and stored automatically.',
      saving: '1 hr/wk saved',
    },
    {
      title: 'Audit-ready records',
      desc: 'Every action is logged with who, what, and when. Compliance audits go from days of prep to a single export.',
      saving: '3+ hrs per audit',
    },
    {
      title: 'Automated alerts',
      desc: 'Drivers and managers get push notifications for overdue inspections, expiring certs, and required follow-ups.',
      saving: '30 min/wk saved',
    },
  ]

  return (
    <div>
      <div className={styles.slideHeader}>
        <span className={styles.sectionTag}>Automated Compliance</span>
        <h2 className={styles.slideTitle}>Stay compliant without thinking about it</h2>
        <p className={styles.slideSubtitle}>
          AI handles the tracking, reminders, and record-keeping so your team can focus on the work that matters.
        </p>
      </div>

      <div className={styles.timeline}>
        {items.map((item) => (
          <div key={item.title} className={styles.timelineItem}>
            <div className={styles.timelineTitle}>{item.title}</div>
            <div className={styles.timelineDesc}>{item.desc}</div>
            <div className={styles.timelineSaving}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1v6l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              {item.saving}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SlideTotalImpact() {
  return (
    <div className={styles.impactSlide}>
      <span className={styles.sectionTag}>The Total Impact</span>
      <h2 className={styles.slideTitle}>It adds up — fast</h2>

      <div className={styles.impactGrid}>
        <div className={styles.impactStat}>
          <div className={styles.impactNumber}>15+</div>
          <div className={styles.impactLabel}>Hours saved per week</div>
        </div>
        <div className={styles.impactStat}>
          <div className={styles.impactNumber}>65+</div>
          <div className={styles.impactLabel}>Hours saved per month</div>
        </div>
        <div className={styles.impactStat}>
          <div className={styles.impactNumber}>780+</div>
          <div className={styles.impactLabel}>Hours saved per year</div>
        </div>
        <div className={styles.impactStat}>
          <div className={styles.impactNumber}>93%</div>
          <div className={styles.impactLabel}>Faster invoice processing</div>
        </div>
      </div>

      <div className={styles.impactDivider} />

      <p className={styles.impactQuote}>
        That&apos;s nearly 20 full working weeks back every year — time your team can
        spend on billable work, not paperwork.
      </p>
    </div>
  )
}

function SlideROI() {
  return (
    <div>
      <div className={styles.slideHeader}>
        <span className={styles.sectionTag}>Return on Investment</span>
        <h2 className={styles.slideTitle}>The numbers speak for themselves</h2>
        <p className={styles.slideSubtitle}>
          For a typical 20-vehicle fleet with 3 workshop staff.
        </p>
      </div>

      <div className={styles.roiGrid}>
        {/* Cost of manual work */}
        <div className={styles.roiCard}>
          <div className={styles.roiTitle}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2v16m-4-4h8m-6-8h4" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Cost of doing nothing
          </div>
          <div className={styles.roiRows}>
            <div className={styles.roiRow}>
              <span className={styles.roiLabel}>Admin labour (16 hrs x ~&euro;20/hr)</span>
              <span className={styles.roiValue}>&euro;320/wk</span>
            </div>
            <div className={styles.roiRow}>
              <span className={styles.roiLabel}>Missed compliance penalties</span>
              <span className={styles.roiValue}>&euro;500+/yr</span>
            </div>
            <div className={styles.roiRow}>
              <span className={styles.roiLabel}>Invoice errors &amp; duplicates</span>
              <span className={styles.roiValue}>&euro;200/mo</span>
            </div>
            <div className={styles.roiRow}>
              <span className={styles.roiLabel}>Lost billable hours</span>
              <span className={styles.roiValue}>&euro;400/wk</span>
            </div>
          </div>
        </div>

        {/* With qMechanic */}
        <div className={`${styles.roiCard} ${styles.roiCardAccent}`}>
          <div className={styles.roiTitle}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 10l3 3 7-7" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            With qMechanic AI
          </div>
          <div className={styles.roiRows}>
            <div className={styles.roiRow}>
              <span className={styles.roiLabel}>qMechanic cost (5 seats)</span>
              <span className={`${styles.roiValue} ${styles.roiValueAccent}`}>~&euro;145/mo</span>
            </div>
            <div className={styles.roiRow}>
              <span className={styles.roiLabel}>Admin time reclaimed</span>
              <span className={`${styles.roiValue} ${styles.roiValueSuccess}`}>15+ hrs/wk</span>
            </div>
            <div className={styles.roiRow}>
              <span className={styles.roiLabel}>Compliance risk</span>
              <span className={`${styles.roiValue} ${styles.roiValueSuccess}`}>Near zero</span>
            </div>
            <div className={styles.roiRow}>
              <span className={styles.roiLabel}>Invoice accuracy</span>
              <span className={`${styles.roiValue} ${styles.roiValueSuccess}`}>99%+</span>
            </div>
          </div>
          <div className={styles.roiTotal}>
            <span className={styles.roiTotalLabel}>Estimated monthly savings</span>
            <span className={styles.roiTotalValue}>&euro;2,400+</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function SlideCTA() {
  return (
    <div className={styles.ctaSlide}>
      <div className={styles.ctaIcon}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h2 className={styles.ctaTitle}>
        Ready to get those hours back?
      </h2>
      <p className={styles.ctaDesc}>
        See how qMechanic&apos;s AI-powered platform works for your fleet.
        Book a personalized demo — we&apos;ll show you exactly where
        your team can save time.
      </p>
      <div className={styles.ctaActions}>
        <Link
          href="/contact"
          className="btn btn-primary"
          onClick={() => track('AI Savings CTA Click', { label: 'Book Demo', location: 'final-slide' })}
        >
          Book a Demo
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        <Link
          href="/request-access"
          className="btn btn-secondary"
          onClick={() => track('AI Savings CTA Click', { label: 'Request Access', location: 'final-slide' })}
        >
          Request Access
        </Link>
      </div>
      <p className={styles.ctaNote}>Free 14-day trial &bull; No credit card required</p>
    </div>
  )
}
