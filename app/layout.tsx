import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const SITE_URL = 'https://qmechanic.autos'

export const metadata: Metadata = {
  title: {
    default: 'qMechanic | Modern Fleet Management',
    template: '%s | qMechanic',
  },
  description:
    'Digital job cards, AI-powered invoice processing, and complete fleet visibility. Built for modern workshops.',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: 'website',
    siteName: 'qMechanic',
    title: 'qMechanic | Modern Fleet Management',
    description:
      'Digital job cards, AI-powered invoice processing, and complete fleet visibility. Built for modern workshops.',
    url: SITE_URL,
    images: [{ url: '/og-image.png' }],
    locale: 'en_IE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'qMechanic | Modern Fleet Management',
    description:
      'Digital job cards, AI-powered invoice processing, and complete fleet visibility. Built for modern workshops.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
  },
  other: {
    'theme-color': '#0a0f1c',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Instrument+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
