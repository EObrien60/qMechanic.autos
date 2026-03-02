'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { track } from '@vercel/analytics'
import styles from './Header.module.css'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/features', label: 'Features' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/contact', label: 'Contact' },
    { path: '/support', label: 'Support' },
  ]

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <img src="/qmlogo_darkmode.png" alt="qMechanic" className={styles.logoImg} />
          <span className={styles.logoText}>qMechanic</span>
        </Link>

        <nav className={`${styles.nav} ${mobileOpen ? styles.navOpen : ''}`}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`${styles.navLink} ${pathname === item.path ? styles.active : ''}`}
              onClick={() => {
                track('Nav Click', { item: item.label, location: 'header' })
                setMobileOpen(false)
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link href="/launch" className={styles.loginLink} onClick={() => track('CTA Click', { label: 'Sign In', location: 'header' })}>
            Sign In
          </Link>
          <Link href="/contact" className="btn btn-primary" onClick={() => track('CTA Click', { label: 'Book Demo', location: 'header' })}>
            Book Demo
          </Link>
        </div>

        <button
          className={styles.mobileToggle}
          onClick={() => {
            track('Mobile Menu Toggle', { action: mobileOpen ? 'close' : 'open' })
            setMobileOpen(!mobileOpen)
          }}
          aria-label="Toggle menu"
        >
          <span className={`${styles.hamburger} ${mobileOpen ? styles.open : ''}`} />
        </button>
      </div>
    </header>
  )
}
