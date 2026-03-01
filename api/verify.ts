import type { VercelRequest, VercelResponse } from '@vercel/node'

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

  const code = req.query.code as string | undefined
  if (!code || code.length < 1) {
    return res.status(400).json({ error: 'A verification code is required' })
  }

  const gatekeeperUrl = process.env.GATEKEEPER_URL
  if (!gatekeeperUrl) {
    console.error('GATEKEEPER_URL not configured')
    return res.status(500).json({ error: 'Server configuration error' })
  }

  try {
    const upstream = await fetch(`${gatekeeperUrl}/api/instances/verify/${encodeURIComponent(code)}`)

    if (upstream.status === 404) {
      return res.status(404).json({ error: 'Code not found' })
    }

    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: 'Verification failed' })
    }

    const data = await upstream.json()
    return res.status(200).json(data)
  } catch (error) {
    console.error('Verify proxy error:', error)
    return res.status(500).json({ error: 'Failed to verify code' })
  }
}
