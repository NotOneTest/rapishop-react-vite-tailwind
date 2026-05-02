import { useState } from 'react'
import { Link } from 'react-router-dom'

const initialFeedbacks = [
  {
    id: 1,
    user: 'GamerPro2024',
    avatar: 'G',
    rating: 5,
    comment: 'Excelente tienda, los mejores precios que encontré. La entrega fue inmediata.',
    date: '2026-04-28'
  },
  {
    id: 2,
    user: 'Ana_Maria',
    avatar: 'A',
    rating: 4,
    comment: 'Muy buena experiencia. El catálogo es amplio y la interfaz es súper intuitiva.',
    date: '2026-04-25'
  },
  {
    id: 3,
    user: 'CarlosGamer',
    avatar: 'C',
    rating: 5,
    comment: 'Me encanta el diseño gaming de la página. Definitivamente volveré a comprar.',
    date: '2026-04-20'
  }
]

function Feedback() {
  const [feedbacks, setFeedbacks] = useState(initialFeedbacks)
  const [newFeedback, setNewFeedback] = useState({
    user: '',
    rating: 5,
    comment: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const feedback = {
      id: Date.now(),
      user: newFeedback.user || 'Anónimo',
      avatar: (newFeedback.user || 'A')[0].toUpperCase(),
      rating: newFeedback.rating,
      comment: newFeedback.comment,
      date: new Date().toISOString().split('T')[0]
    }
    setFeedbacks([feedback, ...feedbacks])
    setNewFeedback({ user: '', rating: 5, comment: '' })
  }

  const handleChange = (e) => {
    setNewFeedback({ ...newFeedback, [e.target.name]: e.target.value })
  }

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${star <= rating ? 'text-[#FFD700]' : 'text-[#1A1F2E]'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-black text-white mb-2">
          Opiniones de <span className="text-[#00CFFF]">Clientes</span>
        </h1>
        <p className="text-[#A0A0A0] mb-10">
          Comparte tu experiencia con nosotros y lee lo que otros gamers opinan
        </p>

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
                    value={newFeedback.user}
                    onChange={handleChange}
                    className="input-gaming w-full"
                    placeholder="Tu nombre o nickname"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#A0A0A0] mb-2">Calificación</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewFeedback({ ...newFeedback, rating: star })}
                        className="transition-transform hover:scale-110"
                      >
                        <svg
                          className={`w-8 h-8 ${
                            star <= newFeedback.rating ? 'text-[#FFD700]' : 'text-[#1A1F2E]'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#A0A0A0] mb-1">Comentario</label>
                  <textarea
                    name="comment"
                    value={newFeedback.comment}
                    onChange={handleChange}
                    className="input-gaming w-full min-h-[120px] resize-none"
                    placeholder="Cuéntanos tu experiencia con RAPI SHOP..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full py-3 rounded-lg font-semibold"
                >
                  Enviar opinión
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">
                Opiniones recientes ({feedbacks.length})
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-[#A0A0A0] text-sm">Promedio:</span>
                <div className="flex">
                  {renderStars(
                    Math.round(
                      feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length
                    )
                  )}
                </div>
              </div>
            </div>

            {feedbacks.map((feedback) => (
              <div key={feedback.id} className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00CFFF] to-[#00A8BB] flex items-center justify-center text-black font-bold text-lg flex-shrink-0">
                    {feedback.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-white">{feedback.user}</h3>
                        <p className="text-xs text-[#A0A0A0]">{feedback.date}</p>
                      </div>
                      {renderStars(feedback.rating)}
                    </div>
                    <p className="text-[#A0A0A0] leading-relaxed">{feedback.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/products"
            className="btn-outline py-3 px-8 rounded-lg inline-block"
          >
            Volver a la tienda
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Feedback
