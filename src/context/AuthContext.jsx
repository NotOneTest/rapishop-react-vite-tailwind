import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('rapishop_currentUser')
    return saved ? JSON.parse(saved) : null
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem('rapishop_currentUser', JSON.stringify(user))
    } else {
      localStorage.removeItem('rapishop_currentUser')
    }
  }, [user])

  function login(email, password) {
    const users = JSON.parse(localStorage.getItem('rapishop_users') || '[]')
    const found = users.find(u => u.email === email && u.password === password)
    if (found) {
      setUser(found)
      return { success: true }
    }
    return { success: false, error: 'Email o contraseña incorrectos' }
  }

  function register(name, email, password) {
    const users = JSON.parse(localStorage.getItem('rapishop_users') || '[]')
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'El email ya está registrado' }
    }
    const newUser = { id: Date.now(), name, email, password, createdAt: new Date().toISOString() }
    users.push(newUser)
    localStorage.setItem('rapishop_users', JSON.stringify(users))
    setUser(newUser)
    return { success: true }
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
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
