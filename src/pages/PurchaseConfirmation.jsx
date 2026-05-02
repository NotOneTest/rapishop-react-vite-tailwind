import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function PurchaseConfirmation() {
  const location = useLocation()
  const { user } = useAuth()
  const order = location.state?.order
  const [keyStatus, setKeyStatus] = useState('pendiente')

  useEffect(() => {
    if (!order) return

    const timer = setTimeout(() => {
      setKeyStatus('entregado')

      const orders = JSON.parse(localStorage.getItem('rapishop_orders') || '[]')
      const updated = orders.map(o =>
        o.id === order.id ? { ...o, estadoClave: 'entregado' } : o
      )
      localStorage.setItem('rapishop_orders', JSON.stringify(updated))
    }, 5000)

    return () => clearTimeout(timer)
  }, [order])

  if (!order) {
    return (
      <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">No hay datos de compra</h1>
          <Link to="/products" className="btn-secondary py-3 px-8 rounded-lg">Ir a la tienda</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#00CFFF] to-[#00A8BB] flex items-center justify-center">
            <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-black text-white mb-3">
            ¡Compra <span className="text-[#00CFFF]">Exitosa</span>!
          </h1>
          <p className="text-[#A0A0A0] text-lg">Tu pedido ha sido procesado correctamente</p>
        </div>

        <div className="card p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Resumen de compra</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-[#A0A0A0]">ID Orden</span>
              <span className="text-white">#{order.id}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#A0A0A0]">Fecha</span>
              <span className="text-white">{new Date(order.fecha).toLocaleDateString('es-PE')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#A0A0A0]">Usuario</span>
              <span className="text-white">{user?.name || order.userName}</span>
            </div>
          </div>

          <hr className="border-[#1A1F2E] my-4" />

          <div className="space-y-3 mb-4">
            {order.productos.map(producto => (
              <div key={producto.id} className="flex justify-between text-sm">
                <span className="text-[#A0A0A0]">{producto.title} x{producto.quantity}</span>
                <span className="text-white">${(producto.price * producto.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <hr className="border-[#1A1F2E] my-4" />

          <div className="flex justify-between text-lg font-bold">
            <span className="text-white">Total pagado</span>
            <span className="text-[#00CFFF]">${order.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="card p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Clave Digital</h2>
          {keyStatus === 'pendiente' ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 mx-auto mb-4 border-4 border-[#FFD700] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-[#FFD700] font-medium">Generando clave digital...</p>
              <p className="text-[#A0A0A0] text-sm mt-1">Esto tomará unos segundos</p>
            </div>
          ) : (
            <div className="text-center py-4 bg-[#00CFFF]/10 rounded-lg border border-[#00CFFF]/30">
              <p className="text-[#00CFFF] font-medium mb-2">¡Clave entregada!</p>
              <p className="text-2xl font-mono font-bold text-[#FFD700] tracking-wider">{order.claveDigital}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/perfil" className="btn-secondary py-3 px-8 rounded-lg text-center">Ver mis compras</Link>
          <Link to="/products" className="btn-outline py-3 px-8 rounded-lg text-center">Seguir comprando</Link>
        </div>
      </div>
    </div>
  )
}

export default PurchaseConfirmation
