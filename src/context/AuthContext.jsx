// CONTEXT API DE AUTENTICACION
// Permite compartir estado del usuario entre componentes (login, registro, logout, sesion persistente)

import { createContext, useContext, useState, useEffect } from 'react'
import { loadFromStorage, saveToStorage, removeFromStorage } from '../utils/storage'

const AuthContext = createContext()

// Variable de entorno de Vite para la URL del backend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

// PROVIDER DEL CONTEXT
export function AuthProvider({ children }) {
  // useState con inicializador lazy: carga desde localStorage solo al inicio
  const [user, setUser] = useState(() => loadFromStorage('rapishop_currentUser', null))
  const [loading, setLoading] = useState(false)

  // sincroniza estado con localStorage cada vez que user cambia
  useEffect(() => {
    if (user) {
      saveToStorage('rapishop_currentUser', user)
    } else {
      removeFromStorage('rapishop_currentUser')
    }
  }, [user])

  // FUNCION LOGIN - async/await para esperar respuesta del servidor
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
      // catch: atrapa errores de red
      setLoading(false)
      return { success: false, error: 'No se pudo conectar al servidor. Intenta de nuevo.' }
    }
  }

  // FUNCION REGISTER
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

  // FUNCION LOGOUT
  async function logout() {
    try {
      await fetch(`${API_URL}/logout`, { method: 'POST' })
    } catch {
    }
    setUser(null)
  }

  // VALUE: todo lo que se comparte con componentes hijos
  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated: !!user,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  )
}

// HOOK PERSONALIZADO para acceder al contexto
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
