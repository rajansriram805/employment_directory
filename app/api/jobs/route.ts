import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Job from '@/models/Job'
import { verifyToken } from '@/lib/jwt'
import User from '@/models/User'

// GET - Get all jobs
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get('search') || ''
    const type = searchParams.get('type') || ''
    const location = searchParams.get('location') || ''

    const query: any = {}
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ]
    }
    
    if (type) query.type = type
    if (location) query.location = { $regex: location, $options: 'i' }

    const jobs = await Job.find(query)
      .populate('employer', 'name email')
      .sort({ createdAt: -1 })

    return NextResponse.json({
      success: true,
      jobs
    })
  } catch (error: any) {
    console.error('Get jobs error:', error)
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    )
  }
}

// POST - Create a new job
export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const decoded = verifyToken(token)
    const user = await User.findById(decoded.id)
    
    if (!user || user.role !== 'employer') {
      return NextResponse.json(
        { success: false, message: 'Only employers can create jobs' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { title, description, company, location, salary, type, requirements } = body

    const job = await Job.create({
      title,
      description,
      company,
      location,
      salary,
      type: type || 'full-time',
      requirements: requirements || [],
      employer: user._id
    })

    return NextResponse.json({
      success: true,
      job
    }, { status: 201 })
  } catch (error: any) {
    console.error('Create job error:', error)
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    )
  }
}

