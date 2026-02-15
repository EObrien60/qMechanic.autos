import type { VercelRequest, VercelResponse } from '@vercel/node'
import { sql, initDb } from '../_lib/db.js'

interface FlagUpdate {
  id: string
  enabled: boolean
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
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

    const { flags } = req.body as { flags: FlagUpdate[] }

    if (!flags || !Array.isArray(flags)) {
      return res.status(400).json({ error: 'Invalid flags data' })
    }

    for (const flag of flags) {
      await sql`
        UPDATE feature_flags
        SET enabled = ${flag.enabled}, updated_at = CURRENT_TIMESTAMP
        WHERE id = ${flag.id}
      `
    }

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Flags update error:', error)
    return res.status(500).json({ error: 'Failed to update flags' })
  }
}
