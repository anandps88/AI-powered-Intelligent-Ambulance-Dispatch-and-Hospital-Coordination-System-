// API Service Layer for Backend Integration
// Base URL for the backend API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken')
  }
  return null
}

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json()
  
  if (!response.ok) {
    throw new Error(data.message || 'API request failed')
  }
  
  return data
}

// Helper function to make authenticated requests
const authFetch = async (endpoint, options = {}) => {
  const token = getAuthToken()
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })
  
  return handleResponse(response)
}

// ============================================
// AUTH API ENDPOINTS
// ============================================

export const authAPI = {
  // Login with email and password
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    return handleResponse(response)
  },

  // Logout
  logout: async () => {
    return authFetch('/api/auth/logout', {
      method: 'POST',
    })
  },

  // Verify token
  verify: async () => {
    return authFetch('/api/auth/verify')
  },
}

// ============================================
// DASHBOARD API ENDPOINTS
// ============================================

export const dashboardAPI = {
  // Get dashboard statistics
  getStats: async () => {
    return authFetch('/api/dashboard')
  },

  // Get real-time stats (with randomization)
  getRealtimeStats: async () => {
    return authFetch('/api/dashboard/stats')
  },
}

// ============================================
// INCIDENTS API ENDPOINTS
// ============================================

export const incidentsAPI = {
  // Get all incidents
  getAll: async () => {
    return authFetch('/api/incidents')
  },

  // Get incident by ID
  getById: async (id) => {
    return authFetch(`/api/incidents/${id}`)
  },

  // Create new incident
  create: async (incidentData) => {
    return authFetch('/api/incidents', {
      method: 'POST',
      body: JSON.stringify(incidentData),
    })
  },

  // Update incident
  update: async (id, updates) => {
    return authFetch(`/api/incidents/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    })
  },
}

// ============================================
// HOSPITALS API ENDPOINTS
// ============================================

export const hospitalsAPI = {
  // Get all hospitals
  getAll: async () => {
    return authFetch('/api/hospitals')
  },

  // Get available hospitals only
  getAvailable: async () => {
    return authFetch('/api/hospitals/available')
  },

  // Get hospital by ID
  getById: async (id) => {
    return authFetch(`/api/hospitals/${id}`)
  },

  // Update hospital
  update: async (id, updates) => {
    return authFetch(`/api/hospitals/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    })
  },
}

// ============================================
// HEALTH CHECK
// ============================================

export const healthAPI = {
  check: async () => {
    const response = await fetch(`${API_BASE_URL}/health`)
    return handleResponse(response)
  },
}

// Export base URL for direct use
export { API_BASE_URL }
