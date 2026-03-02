import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')
  if (!code || code.length < 1) {
    return NextResponse.json({ error: 'A verification code is required' }, { status: 400 })
  }

  const gatekeeperUrl = process.env.GATEKEEPER_URL
  if (!gatekeeperUrl) {
    console.error('GATEKEEPER_URL not configured')
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  try {
    const upstream = await fetch(`${gatekeeperUrl}/api/instances/verify/${encodeURIComponent(code)}`)

    if (upstream.status === 404) {
      return NextResponse.json({ error: 'Code not found' }, { status: 404 })
    }

    if (!upstream.ok) {
      return NextResponse.json({ error: 'Verification failed' }, { status: upstream.status })
    }

    const data = await upstream.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Verify proxy error:', error)
    return NextResponse.json({ error: 'Failed to verify code' }, { status: 500 })
  }
}
