import type { Metadata } from 'next'
import HomeContent from './HomeContent'

export const metadata: Metadata = {
  title: "Casa Bonita | Denver's Legendary Dining & Entertainment",
  description:
    "Casa Bonita — Denver's most iconic dining and entertainment destination. Indoor waterfall, cliff divers, authentic Mexican cuisine, and unforgettable experiences in Lakewood, Colorado.",
  alternates: { canonical: '/' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Casa Bonita',
  servesCuisine: 'Mexican',
  description:
    "Denver's most iconic dining and entertainment destination. Indoor waterfall, cliff divers, authentic Mexican cuisine, and unforgettable experiences.",
  url: 'https://casabonitadenver.com',
  telephone: '+1-303-232-5115',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '6715 W Colfax Ave',
    addressLocality: 'Lakewood',
    addressRegion: 'CO',
    postalCode: '80214',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 39.7418,
    longitude: -105.0858,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '16:00',
      closes: '21:00',
    },
  ],
  priceRange: '$$',
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeContent />
    </>
  )
}
