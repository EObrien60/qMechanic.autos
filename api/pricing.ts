import type { VercelRequest, VercelResponse } from '@vercel/node'
import { sql, initDb } from './_db'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    await initDb()

    const rows = await sql`
      SELECT id, name, description, price_monthly, price_yearly, features, highlighted, cta_text
      FROM pricing
      ORDER BY price_monthly ASC
    `

    const tiers = rows.map(row => ({
      id: row.id,
      name: row.name,
      description: row.description,
      price_monthly: row.price_monthly,
      price_yearly: row.price_yearly,
      features: row.features,
      highlighted: row.highlighted,
      cta_text: row.cta_text,
    }))

    return res.status(200).json({ tiers })
  } catch (error) {
    console.error('Pricing fetch error:', error)
    return res.status(500).json({ error: 'Failed to fetch pricing' })
  }
}
