'use client'

import { useState } from 'react'
import { track } from '@vercel/analytics'
import styles from './RequestAccess.module.css'

export default function RequestAccess() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    fleet_size: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    track('Form Submit', { form: 'request-access', shopSize: formData.fleet_size || 'not-specified' })

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          message: formData.message || 'New account request from website.',
          form_source: 'request-access',
          submitted_at: new Date().toISOString(),
        }),
      })

      if (res.ok) {
        setStatus('success')
        track('Form Success', { form: 'request-access' })
        setFormData({ name: '', email: '', company: '', fleet_size: '', message: '' })
      } else {
        setStatus('error')
        track('Form Error', { form: 'request-access', reason: 'server-error' })
      }
    } catch {
      setStatus('error')
      track('Form Error', { form: 'request-access', reason: 'network-error' })
    }
  }

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.info}>
            <span className={styles.sectionTag}>Get Started</span>
            <h1>Create your account</h1>
            <p className={styles.subtitle}>
              qMechanic is open to any automotive repair business. Submit your details and our team will set up your workspace and send you an activation code.
            </p>

            <div className={styles.steps}>
              <div className={styles.step}>
                <span className={styles.stepNumber}>1</span>
                <div className={styles.stepText}>
                  <h4>Submit your details</h4>
                  <p>Tell us about your business so we can configure your workspace.</p>
                </div>
              </div>
              <div className={styles.step}>
                <span className={styles.stepNumber}>2</span>
                <div className={styles.stepText}>
                  <h4>Receive your activation code</h4>
                  <p>We&apos;ll email your unique code, typically within one business day.</p>
                </div>
              </div>
              <div className={styles.step}>
                <span className={styles.stepNumber}>3</span>
                <div className={styles.stepText}>
                  <h4>Activate in the app</h4>
                  <p>Enter the code on the activation screen and you&apos;re ready to go.</p>
                </div>
              </div>
            </div>

            <div className={styles.openAccess}>
              <span className={styles.openDot} />
              <span>Open to all — no invitation required</span>
            </div>
          </div>

          <div className={styles.formCard}>
            <h3 className={styles.formTitle}>Request Access</h3>
            {status === 'success' ? (
              <div className={styles.successMessage}>
                <div className={styles.successIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>Request received!</h3>
                <p>We&apos;re setting up your workspace. You&apos;ll receive your activation code by email within one business day.</p>
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
                      placeholder="John Smith"
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
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="company">Business Name</label>
                    <input
                      type="text"
                      id="company"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Smith's Auto Repair"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="fleet_size">Shop Size</label>
                    <select
                      id="fleet_size"
                      value={formData.fleet_size}
                      onChange={(e) => setFormData({ ...formData, fleet_size: e.target.value })}
                    >
                      <option value="">Select...</option>
                      <option value="1-5">1–5 technicians</option>
                      <option value="6-15">6–15 technicians</option>
                      <option value="16-50">16–50 technicians</option>
                      <option value="50+">50+ technicians</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message">Anything else? (optional)</label>
                  <textarea
                    id="message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your shop or any questions you have..."
                  />
                </div>

                {status === 'error' && (
                  <div className={styles.errorMessage}>
                    Something went wrong. Please try again or email us at info@obhsoftware.ie.
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Submitting...' : 'Request Access'}
                </button>

                <p className={styles.formNote}>
                  Free to get started. By submitting, you agree to our privacy policy.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
