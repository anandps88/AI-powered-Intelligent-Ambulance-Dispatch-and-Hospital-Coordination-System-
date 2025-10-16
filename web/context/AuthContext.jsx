'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in on mount
    const authUser = localStorage.getItem('authUser')
    if (authUser) {
      setUser(JSON.parse(authUser))
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    // Dummy authentication
    if (email === 'anand' && password === '123456') {
      const userData = {
        email: email,
        name: 'Anand',
        role: 'Admin',
        loginTime: new Date().toISOString()
      }
      localStorage.setItem('authUser', JSON.stringify(userData))
      setUser(userData)
      return { success: true }
    }
    return { success: false, error: 'Invalid credentials' }
  }

  const logout = () => {
    localStorage.removeItem('authUser')
    setUser(null)
    router.push('/auth/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
