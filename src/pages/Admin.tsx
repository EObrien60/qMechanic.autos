import { useState, useEffect } from 'react'
import styles from './Admin.module.css'

const ADMIN_PASSWORD = 'qmechanic2024'

interface Message {
  id: number
  name: string
  email: string
  company: string
  fleet_size: string
  message: string
  created_at: string
  read: boolean
}

interface PricingTier {
  id: string
  name: string
  description: string
  price_monthly: number
  price_yearly: number
  features: string[]
  highlighted: boolean
  cta_text: string
}

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<'messages' | 'pricing'>('messages')
  const [messages, setMessages] = useState<Message[]>([])
  const [pricing, setPricing] = useState<PricingTier[]>([])
  const [loading, setLoading] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true)
      setError('')
      sessionStorage.setItem('admin_auth', 'true')
    } else {
      setError('Invalid password')
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') === 'true') {
      setAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    if (authenticated) {
      fetchData()
    }
  }, [authenticated])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [messagesRes, pricingRes] = await Promise.all([
        fetch('/api/admin/messages'),
        fetch('/api/pricing'),
      ])
      const messagesData = await messagesRes.json()
      const pricingData = await pricingRes.json()
      setMessages(messagesData.messages || [])
      setPricing(pricingData.tiers || getDefaultPricing())
    } catch {
      console.error('Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }

  const getDefaultPricing = (): PricingTier[] => [
    {
      id: 'starter',
      name: 'Starter',
      description: 'For small workshops and owner-operators',
      price_monthly: 49,
      price_yearly: 470,
      features: ['Up to 10 vehicles', 'Digital job cards', 'Basic inspections', 'Email support', '1 user seat'],
      highlighted: false,
      cta_text: 'Start Free Trial',
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'For growing fleets and workshops',
      price_monthly: 149,
      price_yearly: 1430,
      features: ['Up to 50 vehicles', 'Everything in Starter', 'AI invoice processing', 'Fleet analytics', 'Priority support', '5 user seats'],
      highlighted: true,
      cta_text: 'Start Free Trial',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large operations with complex needs',
      price_monthly: 399,
      price_yearly: 3830,
      features: ['Unlimited vehicles', 'Everything in Professional', 'Live GPS tracking', 'Custom integrations', 'Dedicated account manager', 'Unlimited users', 'SLA guarantee'],
      highlighted: false,
      cta_text: 'Contact Sales',
    },
  ]

  const savePricing = async () => {
    setSaveStatus('saving')
    try {
      const res = await fetch('/api/admin/pricing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tiers: pricing }),
      })
      if (res.ok) {
        setSaveStatus('saved')
        setTimeout(() => setSaveStatus('idle'), 2000)
      } else {
        setSaveStatus('error')
      }
    } catch {
      setSaveStatus('error')
    }
  }

  const updateTier = (index: number, field: keyof PricingTier, value: unknown) => {
    const updated = [...pricing]
    updated[index] = { ...updated[index], [field]: value }
    setPricing(updated)
  }

  const updateFeature = (tierIndex: number, featureIndex: number, value: string) => {
    const updated = [...pricing]
    updated[tierIndex].features[featureIndex] = value
    setPricing(updated)
  }

  const addFeature = (tierIndex: number) => {
    const updated = [...pricing]
    updated[tierIndex].features.push('')
    setPricing(updated)
  }

  const removeFeature = (tierIndex: number, featureIndex: number) => {
    const updated = [...pricing]
    updated[tierIndex].features.splice(featureIndex, 1)
    setPricing(updated)
  }

  const markAsRead = async (id: number) => {
    try {
      await fetch(`/api/admin/messages/${id}/read`, { method: 'POST' })
      setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m))
    } catch {
      console.error('Failed to mark as read')
    }
  }

  const handleLogout = () => {
    setAuthenticated(false)
    sessionStorage.removeItem('admin_auth')
  }

  if (!authenticated) {
    return (
      <div className={styles.loginPage}>
        <div className={styles.loginCard}>
          <div className={styles.loginHeader}>
            <div className={styles.logo}>
              <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 16a8 8 0 1 1 16 0" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                <circle cx="16" cy="16" r="3" fill="currentColor"/>
                <path d="M16 13v-4M19 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h1>Admin Portal</h1>
            <p>Enter password to continue</p>
          </div>
          <form onSubmit={handleLogin} className={styles.loginForm}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
            />
            {error && <div className={styles.error}>{error}</div>}
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Sign In
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.admin}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.logo}>
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 16a8 8 0 1 1 16 0" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              <circle cx="16" cy="16" r="3" fill="currentColor"/>
              <path d="M16 13v-4M19 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <span className={styles.headerTitle}>qMechanic Admin</span>
        </div>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          Sign Out
        </button>
      </header>

      <div className={styles.content}>
        <nav className={styles.sidebar}>
          <button
            className={`${styles.navBtn} ${activeTab === 'messages' ? styles.active : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Messages
            {messages.filter(m => !m.read).length > 0 && (
              <span className={styles.badge}>{messages.filter(m => !m.read).length}</span>
            )}
          </button>
          <button
            className={`${styles.navBtn} ${activeTab === 'pricing' ? styles.active : ''}`}
            onClick={() => setActiveTab('pricing')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Pricing
          </button>
        </nav>

        <main className={styles.main}>
          {loading ? (
            <div className={styles.loading}>Loading...</div>
          ) : activeTab === 'messages' ? (
            <div className={styles.messagesTab}>
              <div className={styles.tabHeader}>
                <h2>Contact Messages</h2>
                <span className={styles.count}>{messages.length} total</span>
              </div>
              {messages.length === 0 ? (
                <div className={styles.empty}>No messages yet</div>
              ) : (
                <div className={styles.messageList}>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`${styles.messageCard} ${!msg.read ? styles.unread : ''}`}
                      onClick={() => !msg.read && markAsRead(msg.id)}
                    >
                      <div className={styles.messageHeader}>
                        <div className={styles.sender}>
                          <strong>{msg.name}</strong>
                          {msg.company && <span> - {msg.company}</span>}
                        </div>
                        <span className={styles.date}>
                          {new Date(msg.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div className={styles.messageEmail}>{msg.email}</div>
                      {msg.fleet_size && (
                        <div className={styles.fleetSize}>Fleet: {msg.fleet_size}</div>
                      )}
                      <p className={styles.messageBody}>{msg.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className={styles.pricingTab}>
              <div className={styles.tabHeader}>
                <h2>Pricing Configuration</h2>
                <button
                  onClick={savePricing}
                  className="btn btn-primary"
                  disabled={saveStatus === 'saving'}
                >
                  {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved!' : 'Save Changes'}
                </button>
              </div>
              <div className={styles.pricingGrid}>
                {pricing.map((tier, tierIndex) => (
                  <div key={tier.id} className={styles.tierCard}>
                    <div className={styles.tierHeader}>
                      <input
                        type="text"
                        value={tier.name}
                        onChange={(e) => updateTier(tierIndex, 'name', e.target.value)}
                        className={styles.tierName}
                      />
                      <label className={styles.highlightToggle}>
                        <input
                          type="checkbox"
                          checked={tier.highlighted}
                          onChange={(e) => updateTier(tierIndex, 'highlighted', e.target.checked)}
                        />
                        Featured
                      </label>
                    </div>
                    <textarea
                      value={tier.description}
                      onChange={(e) => updateTier(tierIndex, 'description', e.target.value)}
                      className={styles.tierDesc}
                      rows={2}
                    />
                    <div className={styles.priceInputs}>
                      <div className={styles.priceGroup}>
                        <label>Monthly ($)</label>
                        <input
                          type="number"
                          value={tier.price_monthly}
                          onChange={(e) => updateTier(tierIndex, 'price_monthly', parseInt(e.target.value) || 0)}
                        />
                      </div>
                      <div className={styles.priceGroup}>
                        <label>Yearly ($)</label>
                        <input
                          type="number"
                          value={tier.price_yearly}
                          onChange={(e) => updateTier(tierIndex, 'price_yearly', parseInt(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                    <div className={styles.featuresEditor}>
                      <label>Features</label>
                      {tier.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className={styles.featureRow}>
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => updateFeature(tierIndex, featureIndex, e.target.value)}
                          />
                          <button
                            type="button"
                            onClick={() => removeFeature(tierIndex, featureIndex)}
                            className={styles.removeBtn}
                          >
                            x
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addFeature(tierIndex)}
                        className={styles.addFeatureBtn}
                      >
                        + Add Feature
                      </button>
                    </div>
                    <div className={styles.ctaGroup}>
                      <label>CTA Text</label>
                      <input
                        type="text"
                        value={tier.cta_text}
                        onChange={(e) => updateTier(tierIndex, 'cta_text', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
