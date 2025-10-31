'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/components/AuthProvider'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [applications, setApplications] = useState([])

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      fetchApplications()
    }
  }, [user])

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('/api/applications', {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.data.success) {
        setApplications(response.data.applications)
      }
    } catch (error) {
      console.error('Error fetching applications:', error)
    }
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Welcome, {user.name}!</h2>
        <p className="text-gray-600">Email: {user.email}</p>
        <p className="text-gray-600">Role: {user.role}</p>
      </div>

      {user.role === 'job_seeker' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">My Applications</h2>
          {applications.length === 0 ? (
            <p className="text-gray-600">You haven't applied to any jobs yet.</p>
          ) : (
            <div className="space-y-4">
              {applications.map((app: any) => (
                <div key={app._id} className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-semibold">{app.job.title}</h3>
                  <p className="text-gray-600">{app.job.company}</p>
                  <p className="text-sm text-gray-500">Status: {app.status}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {user.role === 'employer' && (
        <Link
          href="/jobs/create"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 inline-block"
        >
          Post a Job
        </Link>
      )}
    </div>
  )
}

