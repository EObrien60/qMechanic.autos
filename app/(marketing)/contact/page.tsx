'use client'

import { useState } from 'react'
import { track } from '@vercel/analytics'
import styles from './Contact.module.css'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    party_size: '',
    preferred_date: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    track('Form Submit', { form: 'reservations', partySize: formData.party_size || 'not-specified' })

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          form_source: 'reservations',
          submitted_at: new Date().toISOString(),
        }),
      })

      if (res.ok) {
        setStatus('success')
        track('Form Success', { form: 'reservations' })
        setFormData({ name: '', email: '', party_size: '', preferred_date: '', message: '' })
      } else {
        setStatus('error')
        track('Form Error', { form: 'reservations', reason: 'server-error' })
      }
    } catch {
      setStatus('error')
      track('Form Error', { form: 'reservations', reason: 'network-error' })
    }
  }

  return (
    <section className={styles.contact}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.info}>
            <span className={styles.sectionTag}>Reservations</span>
            <h1>Join us for a legendary evening</h1>
            <p className={styles.subtitle}>
              Reserve your table at Casa Bonita. Waterfall, cliff divers, sopapillas, and memories included.
            </p>

            <div className={styles.contactMethods}>
              <div className={styles.contactMethod}>
                <div className={styles.methodIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4>Phone</h4>
                  <a href="tel:+13032325115" onClick={() => track('Contact Method Click', { method: 'phone', page: 'contact' })}>(303) 232-5115</a>
                </div>
              </div>
              <div className={styles.contactMethod}>
                <div className={styles.methodIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4>Email</h4>
                  <a href="mailto:info@casabonitadenver.com" onClick={() => track('Contact Method Click', { method: 'email', page: 'contact' })}>info@casabonitadenver.com</a>
                </div>
              </div>
              <div className={styles.contactMethod}>
                <div className={styles.methodIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4>Address</h4>
                  <span>6715 W Colfax Ave, Lakewood, CO 80214</span>
                </div>
              </div>
            </div>

            <div className={styles.responseTime}>
              <span className={styles.responseDot} />
              <span>Open Wednesday–Sunday, starting at 4pm</span>
            </div>
          </div>

          <div className={styles.formCard}>
            <h3 className={styles.formTitle}>Make a Reservation</h3>
            {status === 'success' ? (
              <div className={styles.successMessage}>
                <div className={styles.successIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Request received!</h3>
                <p>We&apos;ll be in touch within 24 hours to confirm your reservation. See you soon!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Smith"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="party_size">Party Size</label>
                    <select
                      id="party_size"
                      value={formData.party_size}
                      onChange={(e) => setFormData({ ...formData, party_size: e.target.value })}
                    >
                      <option value="">Select...</option>
                      <option value="1-2">1–2 guests</option>
                      <option value="3-5">3–5 guests</option>
                      <option value="6-10">6–10 guests</option>
                      <option value="11-20">11–20 guests</option>
                      <option value="20+">Large party (20+)</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="preferred_date">Preferred Date</label>
                    <input
                      type="date"
                      id="preferred_date"
                      value={formData.preferred_date}
                      onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message">Special Requests</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Birthday celebration? Dietary restrictions? Let us know..."
                  />
                </div>

                {status === 'error' && (
                  <div className={styles.errorMessage}>
                    Something went wrong. Please try again or call us at (303) 232-5115.
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Sending...' : 'Request Reservation'}
                </button>

                <p className={styles.formNote}>
                  By submitting, you agree to our privacy policy. We&apos;ll confirm your reservation by email.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
