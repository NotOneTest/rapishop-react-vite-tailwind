import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { validateEmail } from '../utils/validators'

function Login() {
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [touched, setTouched] = useState({})

  if (isAuthenticated) {
    return <Navigate to="/perfil" replace />
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setFieldErrors({})

    const emailError = validateEmail(formData.email)
    if (emailError) {
      setError(emailError)
      return
    }

    if (!formData.password) {
      setError('La contraseña es obligatoria')
      return
    }

    const result = login(formData.email, formData.password)
    if (result.success) {
      navigate('/perfil')
    } else {
      setError(result.error)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched({ ...touched, [name]: true })

    const errors = {}
    if (name === 'email') {
      if (!value) errors.email = 'El email es obligatorio'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errors.email = 'Email no válido'
    }
    if (name === 'password' && !value) {
      errors.password = 'La contraseña es obligatoria'
    }

    setFieldErrors(errors)
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center px-4">
      <div className="card p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white mb-2">
            Iniciar <span className="text-[#00CFFF]">Sesión</span>
          </h1>
          <p className="text-[#A0A0A0]">Accede a tu cuenta RAPI SHOP</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-[#A0A0A0] mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`input-gaming w-full ${touched.email && fieldErrors.email ? 'border-red-500' : ''}`}
              placeholder="tu@email.com"
              required
            />
            {touched.email && fieldErrors.email && (
              <p className="text-red-400 text-xs mt-1">{fieldErrors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-[#A0A0A0] mb-1">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`input-gaming w-full ${touched.password && fieldErrors.password ? 'border-red-500' : ''}`}
              placeholder="••••••••"
              required
            />
            {touched.password && fieldErrors.password && (
              <p className="text-red-400 text-xs mt-1">{fieldErrors.password}</p>
            )}
          </div>

          <button type="submit" className="btn-primary w-full py-3 rounded-lg text-lg font-semibold">
            Ingresar
          </button>
        </form>

        <p className="text-center text-[#A0A0A0] mt-6 text-sm">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="text-[#00CFFF] hover:text-[#00A8BB] font-medium transition-colors">
            Regístrate aquí
          </Link>
        </p>

        <div className="mt-6 text-center">
          <Link to="/" className="text-[#A0A0A0] hover:text-[#00CFFF] text-sm transition-colors">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
