import type { VercelRequest, VercelResponse } from '@vercel/node'
import { sql, initDb } from '../_lib/db'

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    await initDb()

    const { tiers } = req.body as { tiers: PricingTier[] }

    if (!tiers || !Array.isArray(tiers)) {
      return res.status(400).json({ error: 'Invalid pricing data' })
    }

    // Update each tier
    for (const tier of tiers) {
      await sql`
        INSERT INTO pricing (id, name, description, price_monthly, price_yearly, features, highlighted, cta_text, updated_at)
        VALUES (
          ${tier.id},
          ${tier.name},
          ${tier.description},
          ${tier.price_monthly},
          ${tier.price_yearly},
          ${JSON.stringify(tier.features)}::jsonb,
          ${tier.highlighted},
          ${tier.cta_text},
          CURRENT_TIMESTAMP
        )
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          description = EXCLUDED.description,
          price_monthly = EXCLUDED.price_monthly,
          price_yearly = EXCLUDED.price_yearly,
          features = EXCLUDED.features,
          highlighted = EXCLUDED.highlighted,
          cta_text = EXCLUDED.cta_text,
          updated_at = CURRENT_TIMESTAMP
      `
    }

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Pricing update error:', error)
    return res.status(500).json({ error: 'Failed to update pricing' })
  }
}
