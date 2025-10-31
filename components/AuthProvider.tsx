'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, role?: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      // Check if we're in browser environment
      if (typeof window === 'undefined') {
        setLoading(false)
        return
      }

      const token = localStorage.getItem('token')
      if (!token) {
        setLoading(false)
        return
      }

      const response = await axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (response.data.success) {
        setUser(response.data.user)
      } else {
        localStorage.removeItem('token')
      }
    } catch (error) {
      // Silently fail - user is just not logged in
      localStorage.removeItem('token')
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    const response = await axios.post('/api/auth/login', { email, password })
    
    if (response.data.success) {
      localStorage.setItem('token', response.data.token)
      setUser(response.data.user)
    } else {
      throw new Error(response.data.message)
    }
  }

  const register = async (name: string, email: string, password: string, role?: string) => {
    const response = await axios.post('/api/auth/register', { name, email, password, role })
    
    if (response.data.success) {
      localStorage.setItem('token', response.data.token)
      setUser(response.data.user)
    } else {
      throw new Error(response.data.message)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

