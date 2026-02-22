import { useState } from 'react'
import styles from './Contact.module.css'

export default function DeleteAccount() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: 'Account Deletion Request',
          fleet_size: 'deletion',
          message: formData.message,
        }),
      })

      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <section className={styles.contact}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.info}>
              <span className={styles.sectionTag}>Account Deletion</span>
              <h1>Request Account Deletion</h1>
              <p className={styles.subtitle}>
                You can request the deletion of your qMechanic account and all associated personal data. Once processed, this action cannot be undone.
              </p>

              <div className={styles.contactMethods}>
                <div className={styles.contactMethod}>
                  <div className={styles.methodIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 9v2m0 4h.01M5.07 19H19a2.13 2.13 0 001.85-3.07L13.85 4.07a2.13 2.13 0 00-3.7 0L3.22 15.93A2.13 2.13 0 005.07 19z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4>What gets deleted</h4>
                    <span>Your account, profile info, and all associated data</span>
                  </div>
                </div>
                <div className={styles.contactMethod}>
                  <div className={styles.methodIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4>Processing time</h4>
                    <span>Requests are processed within 30 days</span>
                  </div>
                </div>
                <div className={styles.contactMethod}>
                  <div className={styles.methodIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4>Confirmation</h4>
                    <span>You'll receive an email confirming your request</span>
                  </div>
                </div>
              </div>

              <div className={styles.responseTime}>
                <span className={styles.responseDot} />
                <span>You can also email us directly at info@obhsoftware.ie</span>
              </div>
            </div>

            <div className={styles.formCard}>
              <h3 className={styles.formTitle}>Delete My Account</h3>
              {status === 'success' ? (
                <div className={styles.successMessage}>
                  <div className={styles.successIcon}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3>Request received!</h3>
                  <p>We'll process your account deletion and send a confirmation to your email within 30 days.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="delete-name">Full Name</label>
                      <input
                        type="text"
                        id="delete-name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Smith"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="delete-email">Account Email</label>
                      <input
                        type="email"
                        id="delete-email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="delete-message">Reason for deletion (optional)</label>
                    <textarea
                      id="delete-message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Let us know why you'd like to delete your account (optional but helps us improve)..."
                    />
                  </div>

                  {status === 'error' && (
                    <div className={styles.errorMessage}>
                      Something went wrong. Please try again or email us directly at info@obhsoftware.ie.
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? 'Submitting...' : 'Request Account Deletion'}
                  </button>

                  <p className={styles.formNote}>
                    By submitting, you confirm that you want to permanently delete your account and all associated data. This action is irreversible once processed.
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
