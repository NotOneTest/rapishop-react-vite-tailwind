import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadFromStorage, saveToStorage, removeFromStorage } from '../utils/storage'

const AuthContext = createContext()

const API_URL = 'http://localhost:3001/api'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadFromStorage('rapishop_currentUser', null))
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      saveToStorage('rapishop_currentUser', user)
    } else {
      removeFromStorage('rapishop_currentUser')
    }
  }, [user])

  async function login(email, password) {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setUser(data.user)
        setLoading(false)
        return { success: true }
      }
      setLoading(false)
      return { success: false, error: data.error || 'Error al iniciar sesión' }
    } catch {
      setLoading(false)
      return { success: false, error: 'No se pudo conectar al servidor. Intenta de nuevo.' }
    }
  }

  async function register(name, email, password) {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setUser(data.user)
        setLoading(false)
        return { success: true }
      }
      setLoading(false)
      return { success: false, error: data.error || 'Error al registrarse' }
    } catch {
      setLoading(false)
      return { success: false, error: 'No se pudo conectar al servidor. Intenta de nuevo.' }
    }
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
