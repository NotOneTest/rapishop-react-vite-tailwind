import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { validateRegisterForm, getPasswordStrength } from '../utils/validators'

function Register() {
  const navigate = useNavigate()
  const { register, isAuthenticated } = useAuth()
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' })
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

    const validationError = validateRegisterForm(formData)
    if (validationError) {
      setError(validationError)
      return
    }

    const result = register(formData.name, formData.email, formData.password)
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
    if (name === 'name') {
      if (!value.trim()) errors.name = 'El nombre es obligatorio'
      else if (value.trim().length < 2) errors.name = 'Mínimo 2 caracteres'
      else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(value.trim())) errors.name = 'Solo letras y espacios'
    }
    if (name === 'email') {
      if (!value) errors.email = 'El email es obligatorio'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errors.email = 'Email no válido'
    }
    if (name === 'password') {
      if (!value) errors.password = 'La contraseña es obligatoria'
      else if (value.length < 8) errors.password = 'Mínimo 8 caracteres'
      else if (!/[A-Z]/.test(value)) errors.password = 'Falta una mayúscula'
      else if (!/[a-z]/.test(value)) errors.password = 'Falta una minúscula'
      else if (!/[0-9]/.test(value)) errors.password = 'Falta un número'
      else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) errors.password = 'Falta un carácter especial'
    }
    if (name === 'confirmPassword') {
      if (!value) errors.confirmPassword = 'Debes confirmar la contraseña'
      else if (value !== formData.password) errors.confirmPassword = 'Las contraseñas no coinciden'
    }

    setFieldErrors(errors)
  }

  const passwordStrength = getPasswordStrength(formData.password)
  const requirements = [
    { label: '8+ caracteres', met: formData.password.length >= 8 },
    { label: 'Mayúscula', met: /[A-Z]/.test(formData.password) },
    { label: 'Minúscula', met: /[a-z]/.test(formData.password) },
    { label: 'Número', met: /[0-9]/.test(formData.password) },
    { label: 'Carácter especial', met: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password) },
  ]

  return (
    <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center px-4 py-8">
      <div className="card p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white mb-2">
            Crear <span className="text-[#FFD700]">Cuenta</span>
          </h1>
          <p className="text-[#A0A0A0]">Únete a RAPI SHOP</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-[#A0A0A0] mb-1">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`input-gaming w-full ${touched.name && fieldErrors.name ? 'border-red-500' : ''}`}
              placeholder="Tu nombre"
              required
            />
            {touched.name && fieldErrors.name && (
              <p className="text-red-400 text-xs mt-1">{fieldErrors.name}</p>
            )}
          </div>

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
              placeholder="Mínimo 8 caracteres"
              required
            />
            {formData.password && (
              <div className="mt-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex-1 h-1.5 bg-[#1A1F2E] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${(formData.password.length >= 8 ? 20 : 0) + (/[A-Z]/.test(formData.password) ? 20 : 0) + (/[a-z]/.test(formData.password) ? 20 : 0) + (/[0-9]/.test(formData.password) ? 20 : 0) + (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password) ? 20 : 0)}%`, backgroundColor: passwordStrength.color }}
                    />
                  </div>
                  <span className="text-xs font-medium" style={{ color: passwordStrength.color }}>{passwordStrength.label}</span>
                </div>
                <div className="space-y-1">
                  {requirements.map((req, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <span className={req.met ? 'text-[#00CFFF]' : 'text-[#A0A0A0]'}>
                        {req.met ? '✓' : '○'}
                      </span>
                      <span className={req.met ? 'text-[#00CFFF]' : 'text-[#A0A0A0]'}>{req.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {touched.password && fieldErrors.password && (
              <p className="text-red-400 text-xs mt-1">{fieldErrors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-[#A0A0A0] mb-1">Confirmar contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`input-gaming w-full ${touched.confirmPassword && fieldErrors.confirmPassword ? 'border-red-500' : ''}`}
              placeholder="Repite tu contraseña"
              required
            />
            {touched.confirmPassword && fieldErrors.confirmPassword && (
              <p className="text-red-400 text-xs mt-1">{fieldErrors.confirmPassword}</p>
            )}
          </div>

          <button type="submit" className="btn-primary w-full py-3 rounded-lg text-lg font-semibold">
            Crear cuenta
          </button>
        </form>

        <p className="text-center text-[#A0A0A0] mt-6 text-sm">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-[#00CFFF] hover:text-[#00A8BB] font-medium transition-colors">
            Inicia sesión
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

export default Register
