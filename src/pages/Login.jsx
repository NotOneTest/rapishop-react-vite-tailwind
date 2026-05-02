import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  if (isAuthenticated) {
    return <Navigate to="/perfil" replace />
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
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
              placeholder="••••••••"
              required
            />
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
