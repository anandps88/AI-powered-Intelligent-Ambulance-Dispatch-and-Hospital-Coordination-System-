'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { authAPI } from '@/lib/api'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in on mount
    const authUser = localStorage.getItem('authUser')
    const authToken = localStorage.getItem('authToken')
    if (authUser && authToken) {
      setUser(JSON.parse(authUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      // Call backend API for authentication
      const response = await authAPI.login(email, password)
      
      if (response.success) {
        const { token, user: userData } = response.data
        
        // Store token and user data in localStorage
        localStorage.setItem('authToken', token)
        localStorage.setItem('authUser', JSON.stringify(userData))
        
        setUser(userData)
        return { success: true }
      } else {
        return { success: false, error: response.message || 'Login failed' }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: error.message || 'Network error. Please try again.' }
    }
  }

  const logout = async () => {
    try {
      // Call backend logout endpoint
      await authAPI.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Clear local storage regardless of API call result
      localStorage.removeItem('authUser')
      localStorage.removeItem('authToken')
      setUser(null)
      router.push('/auth/login')
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
