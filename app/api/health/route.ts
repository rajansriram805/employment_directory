import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json({
    status: 'OK',
    message: 'Employment Directory API is running',
    timestamp: new Date().toISOString()
  })
}

