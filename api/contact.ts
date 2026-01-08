import type { VercelRequest, VercelResponse } from '@vercel/node'
import { sql, initDb } from './_db'

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

    const { name, email, company, fleet_size, message } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    await sql`
      INSERT INTO messages (name, email, company, fleet_size, message)
      VALUES (${name}, ${email}, ${company || null}, ${fleet_size || null}, ${message})
    `

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return res.status(500).json({ error: 'Failed to submit message' })
  }
}
