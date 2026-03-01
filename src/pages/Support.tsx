import { useState } from 'react'
import { track } from '@vercel/analytics'
import styles from './Contact.module.css'

export default function Support() {
  const [supportData, setSupportData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [supportStatus, setSupportStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSupportSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSupportStatus('loading')
    track('Form Submit', { form: 'support' })

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: supportData.name,
          email: supportData.email,
          company: supportData.subject,
          fleet_size: 'support',
          message: supportData.message,
        }),
      })

      if (res.ok) {
        setSupportStatus('success')
        track('Form Success', { form: 'support' })
        setSupportData({ name: '', email: '', subject: '', message: '' })
      } else {
        setSupportStatus('error')
        track('Form Error', { form: 'support', reason: 'server-error' })
      }
    } catch {
      setSupportStatus('error')
      track('Form Error', { form: 'support', reason: 'network-error' })
    }
  }

  return (
    <>
      <section className={styles.contact}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.info}>
              <span className={styles.sectionTag}>Support</span>
              <h1>Need help with your account?</h1>
              <p className={styles.subtitle}>
                Already a qMechanic customer? Our support team is here to assist with any issues, questions, or feature requests.
              </p>

              <div className={styles.contactMethods}>
                <div className={styles.contactMethod}>
                  <div className={styles.methodIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4>Support Email</h4>
                    <a href="mailto:info@obhsoftware.ie" onClick={() => track('Contact Method Click', { method: 'email', page: 'support' })}>info@obhsoftware.ie</a>
                  </div>
                </div>
                <div className={styles.contactMethod}>
                  <div className={styles.methodIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4>Phone Support</h4>
                    <a href="tel:+353868363332" onClick={() => track('Contact Method Click', { method: 'phone', page: 'support' })}>+353 (86) 836 3332</a>
                  </div>
                </div>
              </div>

              <div className={styles.responseTime}>
                <span className={styles.responseDot} />
                <span>We aim to respond within 24 hours</span>
              </div>
            </div>

            <div className={styles.formCard}>
              <h3 className={styles.formTitle}>Submit a Support Request</h3>
              {supportStatus === 'success' ? (
                <div className={styles.successMessage}>
                  <div className={styles.successIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3>Request received!</h3>
                  <p>Our support team will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSupportSubmit} className={styles.form}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="support-name">Full Name</label>
                      <input
                        type="text"
                        id="support-name"
                        required
                        value={supportData.name}
                        onChange={(e) => setSupportData({ ...supportData, name: e.target.value })}
                        placeholder="John Smith"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="support-email">Email</label>
                      <input
                        type="email"
                        id="support-email"
                        required
                        value={supportData.email}
                        onChange={(e) => setSupportData({ ...supportData, email: e.target.value })}
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="support-subject">Subject</label>
                    <input
                      type="text"
                      id="support-subject"
                      required
                      value={supportData.subject}
                      onChange={(e) => setSupportData({ ...supportData, subject: e.target.value })}
                      placeholder="Brief description of your issue"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="support-message">Describe your issue</label>
                    <textarea
                      id="support-message"
                      rows={4}
                      required
                      value={supportData.message}
                      onChange={(e) => setSupportData({ ...supportData, message: e.target.value })}
                      placeholder="Please provide as much detail as possible so we can help you quickly..."
                    />
                  </div>

                  {supportStatus === 'error' && (
                    <div className={styles.errorMessage}>
                      Something went wrong. Please try again or email us directly at info@obhsoftware.ie.
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                    disabled={supportStatus === 'loading'}
                  >
                    {supportStatus === 'loading' ? 'Sending...' : 'Submit Request'}
                  </button>

                  <p className={styles.formNote}>
                    We aim to respond to all support requests within 24 hours.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
