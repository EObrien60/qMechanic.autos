import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description: string
  path: string
  noindex?: boolean
  jsonLd?: Record<string, unknown>
}

const SITE_URL = 'https://qmechanic.autos'
const SITE_NAME = 'qMechanic'
const OG_IMAGE = `${SITE_URL}/og-image.png`

export default function SEO({ title, description, path, noindex, jsonLd }: SEOProps) {
  const fullTitle = path === '/' ? `${SITE_NAME} | Modern Fleet Management` : `${title} | ${SITE_NAME}`
  const canonical = `${SITE_URL}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:locale" content="en_IE" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  )
}
