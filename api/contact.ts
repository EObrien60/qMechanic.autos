import type { VercelRequest, VercelResponse } from '@vercel/node'

interface FormPayload {
  name: string
  email: string
  company?: string
  fleet_size?: string
  subject?: string
  message: string
  form_source: string
  submitted_at: string
}

interface WebhookBody {
  title: string
  description: string
  type: 'bug' | 'feature' | 'task'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  source: string
}

function buildWebhookPayload(data: FormPayload): WebhookBody {
  const { name, email, company, fleet_size, subject, message, form_source, submitted_at } = data
  const timestamp = submitted_at || new Date().toISOString()

  const sourceMap: Record<string, { titlePrefix: string; type: WebhookBody['type']; priority: WebhookBody['priority'] }> = {
    'contact': { titlePrefix: 'Demo Request', type: 'task', priority: 'medium' },
    'request-access': { titlePrefix: 'Account Request', type: 'task', priority: 'high' },
    'support': { titlePrefix: 'Support Request', type: 'bug', priority: 'medium' },
    'delete-account': { titlePrefix: 'Account Deletion Request', type: 'task', priority: 'high' },
  }

  const config = sourceMap[form_source] || { titlePrefix: 'Website Form', type: 'task' as const, priority: 'medium' as const }

  const title = `${config.titlePrefix} — ${name} (${email})`

  const lines: string[] = [
    `## ${config.titlePrefix}`,
    '',
    `| Field | Value |`,
    `|-------|-------|`,
    `| **Name** | ${name} |`,
    `| **Email** | ${email} |`,
  ]

  if (company) lines.push(`| **Company** | ${company} |`)
  if (fleet_size) lines.push(`| **Fleet/Shop Size** | ${fleet_size} |`)
  if (subject) lines.push(`| **Subject** | ${subject} |`)

  lines.push(`| **Form** | ${form_source} |`)
  lines.push(`| **Submitted** | ${timestamp} |`)
  lines.push('')
  lines.push('### Message')
  lines.push('')
  lines.push(message || '_No message provided_')

  return {
    title,
    description: lines.join('\n'),
    type: config.type,
    priority: config.priority,
    source: `qmechanic-${form_source}`,
  }
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

  const webhookUrl = process.env.WEBHOOK_URL
  const webhookToken = process.env.WEBHOOK_TOKEN

  if (!webhookUrl || !webhookToken) {
    console.error('Missing WEBHOOK_URL or WEBHOOK_TOKEN environment variables')
    return res.status(500).json({ error: 'Server configuration error' })
  }

  try {
    const { name, email, message } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const payload = buildWebhookPayload(req.body)

    const webhookRes = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${webhookToken}`,
      },
      body: JSON.stringify(payload),
    })

    if (!webhookRes.ok) {
      const errorText = await webhookRes.text()
      console.error('Webhook error:', webhookRes.status, errorText)
      return res.status(502).json({ error: 'Failed to submit form' })
    }

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return res.status(500).json({ error: 'Failed to submit message' })
  }
}
