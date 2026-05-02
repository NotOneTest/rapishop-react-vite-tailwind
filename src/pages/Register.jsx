import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Register() {
  const navigate = useNavigate()
  const { register, isAuthenticated } = useAuth()
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')

  if (isAuthenticated) {
    return <Navigate to="/perfil" replace />
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
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

  return (
    <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center px-4">
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
              className="input-gaming w-full"
              placeholder="Tu nombre"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-[#A0A0A0] mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-gaming w-full"
              placeholder="tu@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-[#A0A0A0] mb-1">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input-gaming w-full"
              placeholder="Mínimo 6 caracteres"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-[#A0A0A0] mb-1">Confirmar contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input-gaming w-full"
              placeholder="Repite tu contraseña"
              required
            />
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
