import type { VercelRequest, VercelResponse } from '@vercel/node'
import { sql, initDb } from './_lib/db.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
      SELECT id, page, label, enabled, sort_order
      FROM feature_flags
      ORDER BY page, sort_order ASC
    `

    return res.status(200).json({ flags: rows })
  } catch (error) {
    console.error('Flags fetch error:', error)
    return res.status(500).json({ error: 'Failed to fetch flags' })
  }
}
