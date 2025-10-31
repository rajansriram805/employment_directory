'use client'

import Link from 'next/link'
import { useAuth } from './AuthProvider'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Employment Directory
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link href="/jobs" className="hover:text-blue-200">
              Jobs
            </Link>
            
            {user ? (
              <>
                {user.role === 'employer' && (
                  <Link href="/jobs/create" className="hover:text-blue-200">
                    Post Job
                  </Link>
                )}
                {user.role === 'admin' && (
                  <Link href="/admin" className="hover:text-blue-200">
                    Admin
                  </Link>
                )}
                <Link href="/dashboard" className="hover:text-blue-200">
                  Dashboard
                </Link>
                <span className="text-blue-200">Welcome, {user.name}</span>
                <button onClick={handleLogout} className="hover:text-blue-200">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="hover:text-blue-200">
                  Login
                </Link>
                <Link href="/auth/register" className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-800">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

