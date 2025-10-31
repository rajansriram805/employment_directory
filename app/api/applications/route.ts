import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Application from '@/models/Application'
import Job from '@/models/Job'
import { verifyToken } from '@/lib/jwt'
import User from '@/models/User'

export const dynamic = 'force-dynamic'

// POST - Create application
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
    
    if (!user || user.role !== 'job_seeker') {
      return NextResponse.json(
        { success: false, message: 'Only job seekers can apply' },
        { status: 403 }
      )
    }

    const { jobId, coverLetter } = await request.json()

    if (!jobId || !coverLetter) {
      return NextResponse.json(
        { success: false, message: 'Please provide job ID and cover letter' },
        { status: 400 }
      )
    }

    // Check if job exists
    const job = await Job.findById(jobId)
    if (!job) {
      return NextResponse.json(
        { success: false, message: 'Job not found' },
        { status: 404 }
      )
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: user._id
    })

    if (existingApplication) {
      return NextResponse.json(
        { success: false, message: 'You have already applied for this job' },
        { status: 400 }
      )
    }

    const application = await Application.create({
      job: jobId,
      applicant: user._id,
      coverLetter
    })

    // Add to job applications array
    job.applications.push(application._id)
    await job.save()

    return NextResponse.json({
      success: true,
      application
    }, { status: 201 })
  } catch (error: any) {
    console.error('Create application error:', error)
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    )
  }
}

// GET - Get applications (for employer or job seeker)
export async function GET(request: NextRequest) {
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
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      )
    }

    let applications

    if (user.role === 'employer') {
      // Get applications for employer's jobs
      const jobs = await Job.find({ employer: user._id })
      const jobIds = jobs.map(job => job._id)
      applications = await Application.find({ job: { $in: jobIds } })
        .populate('job', 'title company')
        .populate('applicant', 'name email profile')
    } else {
      // Get applications for job seeker
      applications = await Application.find({ applicant: user._id })
        .populate('job', 'title company location')
    }

    return NextResponse.json({
      success: true,
      applications
    })
  } catch (error: any) {
    console.error('Get applications error:', error)
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    )
  }
}

