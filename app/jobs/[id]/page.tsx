'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import axios from 'axios'

interface Job {
  _id: string
  title: string
  company: string
  location: string
  salary: string
  type: string
  description: string
  requirements: string[]
  employer: {
    name: string
    email: string
  }
}

export default function JobDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [job, setJob] = useState<Job | null>(null)
  const [coverLetter, setCoverLetter] = useState('')
  const [loading, setLoading] = useState(true)
  const [applying, setApplying] = useState(false)

  useEffect(() => {
    fetchJob()
  }, [])

  const fetchJob = async () => {
    try {
      const response = await axios.get(`/api/jobs/${params.id}`)
      if (response.data.success) {
        setJob(response.data.job)
      }
    } catch (error) {
      console.error('Error fetching job:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApply = async () => {
    if (!user) {
      router.push('/auth/login')
      return
    }

    if (!coverLetter.trim()) {
      alert('Please write a cover letter')
      return
    }

    setApplying(true)
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(
        '/api/applications',
        { jobId: params.id, coverLetter },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (response.data.success) {
        alert('Application submitted successfully!')
        router.push('/dashboard')
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to submit application')
    } finally {
      setApplying(false)
    }
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (!job) {
    return <div className="container mx-auto px-4 py-8">Job not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow mb-6">
          <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
          <p className="text-xl text-gray-600 mb-4">{job.company}</p>
          
          <div className="flex gap-4 mb-6">
            <span className="text-gray-600">📍 {job.location}</span>
            <span className="text-blue-600 font-semibold">💰 {job.salary}</span>
            <span className="bg-gray-100 px-3 py-1 rounded">{job.type}</span>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Job Description</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
          </div>

          {job.requirements && job.requirements.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Requirements</h2>
              <ul className="list-disc list-inside text-gray-700">
                {job.requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {user && user.role === 'job_seeker' && (
          <div className="bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Apply for this Job</h2>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Write your cover letter..."
              rows={8}
              className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleApply}
              disabled={applying}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {applying ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        )}

        {!user && (
          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <p className="mb-4">Please login to apply for this job</p>
            <button
              onClick={() => router.push('/auth/login')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

