import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { generateOrderPDF } from '../utils/generatePDF'

function PurchaseConfirmation() {
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth()
  const [order, setOrder] = useState(location.state?.order || null)
  const [delivered, setDelivered] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    if (!order) return
    const timer = setTimeout(() => {
      setDelivered(true)
    }, 5000)
    return () => clearTimeout(timer)
  }, [order])

  function handleDownloadPDF() {
    if (order && user) {
      generateOrderPDF({ ...order, estadoClave: delivered ? 'entregado' : 'pendiente' }, user)
    }
  }

  if (!isAuthenticated) return null

  if (!order) {
    return (
      <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">No se encontró la orden</h1>
          <p className="text-[#A0A0A0] mb-8">No hay información de compra disponible</p>
          <button onClick={() => navigate('/products')} className="btn-secondary py-3 px-8 rounded-lg">
            Explorar juegos
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="card p-6 sm:p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-[#00CFFF]/20 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-[#00CFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">¡Compra realizada!</h1>
          <p className="text-[#A0A0A0] mb-6">Orden #{order.id}</p>

          <div className="bg-[#1A1F2E] rounded-lg p-4 mb-6 text-left">
            <h2 className="font-bold text-white mb-3">Productos:</h2>
            {order.productos.map(item => (
              <div key={item.id} className="flex justify-between text-sm mb-2">
                <span className="text-[#A0A0A0]">{item.title} x{item.quantity}</span>
                <span className="text-white">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <hr className="border-[#252B3B] my-3" />
            <div className="flex justify-between font-bold">
              <span className="text-white">Total:</span>
              <span className="text-[#00CFFF]">${order.total.toFixed(2)}</span>
            </div>
          </div>

          {delivered ? (
            <div className="bg-[#00CFFF]/10 rounded-lg p-4 mb-6 border border-[#00CFFF]/30">
              <p className="text-xs text-[#A0A0A0] mb-1">Tu clave digital:</p>
              <p className="text-xl font-mono font-bold text-[#FFD700] tracking-wider" aria-label={`Clave digital: ${order.claveDigital}`}>{order.claveDigital}</p>
              <p className="text-xs text-[#00CFFF] mt-2">Clave entregada ✓</p>
            </div>
          ) : (
            <div className="bg-[#FFD700]/10 rounded-lg p-4 mb-6 border border-[#FFD700]/30">
              <p className="text-sm text-[#FFD700]">Procesando clave digital...</p>
              <div className="w-8 h-8 border-2 border-[#FFD700] border-t-transparent rounded-full animate-spin mx-auto mt-3" aria-label="Cargando clave digital" />
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleDownloadPDF}
              className="btn-secondary py-2 px-6 rounded-lg text-sm"
              aria-label="Descargar boleta en PDF"
            >
              Descargar PDF
            </button>
            <button
              onClick={() => navigate('/products')}
              className="btn-primary py-2 px-6 rounded-lg text-sm"
              aria-label="Seguir comprando"
            >
              Seguir comprando
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PurchaseConfirmation
