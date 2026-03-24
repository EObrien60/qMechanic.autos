import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const SITE_URL = 'https://casabonitadenver.com'

export const metadata: Metadata = {
  title: {
    default: 'Casa Bonita | Denver\'s Legendary Dining & Entertainment',
    template: '%s | Casa Bonita',
  },
  description:
    'Casa Bonita — Denver\'s most iconic dining and entertainment destination. Indoor waterfall, cliff divers, Mexican cuisine, and unforgettable experiences in Lakewood, Colorado.',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: 'website',
    siteName: 'Casa Bonita',
    title: 'Casa Bonita | Denver\'s Legendary Dining & Entertainment',
    description:
      'Casa Bonita — Denver\'s most iconic dining and entertainment destination. Indoor waterfall, cliff divers, Mexican cuisine, and unforgettable experiences in Lakewood, Colorado.',
    url: SITE_URL,
    images: [{ url: '/og-image.png' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Casa Bonita | Denver\'s Legendary Dining & Entertainment',
    description:
      'Casa Bonita — Denver\'s most iconic dining and entertainment destination. Indoor waterfall, cliff divers, Mexican cuisine, and unforgettable experiences in Lakewood, Colorado.',
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
