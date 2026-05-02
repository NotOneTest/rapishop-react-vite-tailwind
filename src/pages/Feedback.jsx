import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import initialOpiniones from '../data/opiniones.json'
import { useAuth } from '../context/AuthContext'

function Feedback() {
  const { user } = useAuth()
  const [opiniones, setOpiniones] = useState(() => {
    const saved = localStorage.getItem('rapishop_opiniones')
    if (saved) {
      return JSON.parse(saved)
    }
    return initialOpiniones
  })
  const [newOpinion, setNewOpinion] = useState({ user: '', rating: 5, comentario: '' })

  useEffect(() => {
    localStorage.setItem('rapishop_opiniones', JSON.stringify(opiniones))
  }, [opiniones])

  const handleSubmit = (e) => {
    e.preventDefault()
    const opinion = {
      id: Date.now(),
      user: newOpinion.user || user?.name || 'Anónimo',
      comentario: newOpinion.comentario,
      rating: newOpinion.rating,
      fecha: new Date().toISOString().split('T')[0]
    }
    setOpiniones([opinion, ...opiniones])
    setNewOpinion({ user: '', rating: 5, comentario: '' })
  }

  const handleChange = (e) => {
    setNewOpinion({ ...newOpinion, [e.target.name]: e.target.value })
  }

  const renderStars = (rating) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} className={`w-5 h-5 ${star <= rating ? 'text-[#FFD700]' : 'text-[#1A1F2E]'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )

  const avgRating = opiniones.length > 0
    ? Math.round(opiniones.reduce((sum, o) => sum + o.rating, 0) / opiniones.length)
    : 0

  return (
    <div className="min-h-screen bg-[#0B0F1A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-black text-white mb-2">Opiniones de <span className="text-[#00CFFF]">Clientes</span></h1>
        <p className="text-[#A0A0A0] mb-10">Comparte tu experiencia con nosotros y lee lo que otros gamers opinan</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-4">Deja tu opinión</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-[#A0A0A0] mb-1">Nombre (opcional)</label>
                  <input
                    type="text"
                    name="user"
                    value={newOpinion.user}
                    onChange={handleChange}
                    className="input-gaming w-full"
                    placeholder={user ? user.name : 'Tu nombre o nickname'}
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#A0A0A0] mb-2">Calificación</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} type="button" onClick={() => setNewOpinion({ ...newOpinion, rating: star })} className="transition-transform hover:scale-110">
                        <svg className={`w-8 h-8 ${star <= newOpinion.rating ? 'text-[#FFD700]' : 'text-[#1A1F2E]'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-[#A0A0A0] mb-1">Comentario</label>
                  <textarea
                    name="comentario"
                    value={newOpinion.comentario}
                    onChange={handleChange}
                    className="input-gaming w-full min-h-[120px] resize-none"
                    placeholder="Cuéntanos tu experiencia con RAPI SHOP..."
                    required
                  />
                </div>
                <button type="submit" className="btn-primary w-full py-3 rounded-lg font-semibold">Enviar opinión</button>
              </form>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Opiniones recientes ({opiniones.length})</h2>
              <div className="flex items-center gap-2">
                <span className="text-[#A0A0A0] text-sm">Promedio:</span>
                <div className="flex">{renderStars(avgRating)}</div>
              </div>
            </div>
            {opiniones.map((opinion) => (
              <div key={opinion.id} className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00CFFF] to-[#00A8BB] flex items-center justify-center text-black font-bold text-lg flex-shrink-0">
                    {opinion.user.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-white">{opinion.user}</h3>
                        <p className="text-xs text-[#A0A0A0]">{opinion.fecha}</p>
                      </div>
                      {renderStars(opinion.rating)}
                    </div>
                    <p className="text-[#A0A0A0] leading-relaxed">{opinion.comentario}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 text-center">
          <Link to="/products" className="btn-outline py-3 px-8 rounded-lg inline-block">Volver a la tienda</Link>
        </div>
      </div>
    </div>
  )
}

export default Feedback
