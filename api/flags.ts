import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getAll } from '@vercel/edge-config'

const DEFAULT_FLAGS = [
  { id: 'job-cards', page: 'features', label: 'Digital Job Cards', enabled: true, sort_order: 0 },
  { id: 'inspections', page: 'features', label: 'Pre-Trip & Safety Inspections', enabled: true, sort_order: 1 },
  { id: 'ai-invoices', page: 'features', label: 'AI Invoice Processing', enabled: true, sort_order: 2 },
  { id: 'fleet-tracking', page: 'features', label: 'Live Fleet Tracking', enabled: true, sort_order: 3 },
  { id: 'analytics', page: 'features', label: 'Fleet Analytics', enabled: true, sort_order: 4 },
  { id: 'compliance', page: 'features', label: 'Compliance Management', enabled: true, sort_order: 5 },
]

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
    const edgeConfig = await getAll()
    const overrides = (edgeConfig?.feature_flags ?? {}) as Record<string, boolean>

    const flags = DEFAULT_FLAGS.map(f => ({
      ...f,
      enabled: overrides[f.id] !== undefined ? overrides[f.id] : f.enabled,
    }))

    return res.status(200).json({ flags })
  } catch {
    // Fall back to defaults if Edge Config is unavailable
    return res.status(200).json({ flags: DEFAULT_FLAGS })
  }
}
