// HIGHER ORDER COMPONENT (HOC) DE PROTECCION
// Protege rutas que requieren autenticacion
// Si no esta logueado -> redirige a /login

import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
