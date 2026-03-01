import { useState } from 'react'
import { track } from '@vercel/analytics'
import SEO from '../components/SEO'
import styles from './Launch.module.css'

export default function Launch() {
  const [code, setCode] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (code.length < 1) return

    setStatus('loading')
    setErrorMsg('')
    track('Form Submit', { form: 'launch' })

    try {
      const res = await fetch(`/api/verify?code=${encodeURIComponent(code.toUpperCase())}`)

      if (res.status === 404) {
        setStatus('error')
        setErrorMsg('Code not found. Please check your code and try again.')
        track('Launch Error', { reason: 'code-not-found' })
        return
      }

      if (!res.ok) {
        setStatus('error')
        setErrorMsg('Verification failed. Please try again.')
        track('Launch Error', { reason: 'server-error' })
        return
      }

      const data = await res.json()
      const url = data.launchUrl || data.apiUrl
      if (url) {
        track('Launch Success', { hasLaunchUrl: !!data.launchUrl })
        window.location.href = url
      } else {
        setStatus('error')
        setErrorMsg('No launch URL returned. Please contact support.')
        track('Launch Error', { reason: 'no-url' })
      }
    } catch {
      setStatus('error')
      setErrorMsg('Something went wrong. Please try again.')
      track('Launch Error', { reason: 'network-error' })
    }
  }

  return (
    <>
    <SEO
      title="Launch"
      description="Enter your qMechanic verification code to access your workspace."
      path="/launch"
      noindex
    />
    <section className={styles.page}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <span className={styles.sectionTag}>Launch</span>
          <h1>Sign in to your workspace</h1>
          <p className={styles.subtitle}>
            Enter the 10-character verification code provided by your administrator to access your qMechanic instance.
          </p>

          <div className={styles.formCard}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="code">Verification Code</label>
                <input
                  type="text"
                  id="code"
                  required
                  maxLength={20}
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))}
                  placeholder="XXXXXXXXXX"
                  className={styles.codeInput}
                  autoComplete="off"
                  autoFocus
                />
              </div>

              {status === 'error' && (
                <div className={styles.errorMessage}>{errorMsg}</div>
              )}

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%' }}
                disabled={status === 'loading' || code.length < 1}
              >
                {status === 'loading' ? 'Verifying...' : 'Launch'}
              </button>

              <p className={styles.formNote}>
                Don't have a code? <a href="/request-access">Request access</a> to get started.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </>
  )
}
