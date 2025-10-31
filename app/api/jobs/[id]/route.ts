import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Job from '@/models/Job'
import Application from '@/models/Application'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()

    const job = await Job.findById(params.id)
      .populate('employer', 'name email')
      .populate('applications')

    if (!job) {
      return NextResponse.json(
        { success: false, message: 'Job not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      job
    })
  } catch (error: any) {
    console.error('Get job error:', error)
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    )
  }
}

