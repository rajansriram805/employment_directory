import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json({
    status: 'OK',
    message: 'API is working',
    mongoUri: process.env.MONGODB_URI ? 'Set' : 'Not Set',
    jwtSecret: process.env.JWT_SECRET ? 'Set' : 'Not Set',
    timestamp: new Date().toISOString(),
    nodeEnv: process.env.NODE_ENV
  })
}

