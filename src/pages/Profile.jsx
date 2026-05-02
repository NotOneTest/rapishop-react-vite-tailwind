import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { generateOrderPDF } from '../utils/generatePDF'
import ordersData from '../data/orders.json'

function Profile() {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    const allOrders = JSON.parse(localStorage.getItem('rapishop_orders') || '[]')
    const orders = allOrders.length > 0 ? allOrders : ordersData
    const userOrders = orders.filter(o => o.userId === user.id)
    setOrders(userOrders)
  }, [user, isAuthenticated, navigate])

  function handleLogout() {
    logout()
    navigate('/')
  }

  function handleDownloadPDF(order) {
    generateOrderPDF(order, user)
  }

  function handleViewBoleta(orderId) {
    const order = orders.find(o => o.id === orderId)
    if (order) {
      navigate('/confirmacion', { state: { order } })
    }
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="card p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00CFFF] to-[#00A8BB] flex items-center justify-center text-black font-bold text-2xl">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white">{user.name}</h1>
              <p className="text-[#A0A0A0]">{user.email}</p>
            </div>
          </div>
          <div className="text-sm text-[#A0A0A0]">
            Miembro desde: {new Date(user.createdAt).toLocaleDateString('es-PE')}
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 text-red-400 hover:text-red-300 font-medium text-sm transition-colors"
          >
            Cerrar sesión
          </button>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-white mb-4 sm:mb-6">
          Historial de <span className="text-[#FFD700]">Compras</span>
        </h2>

        {orders.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-[#A0A0A0] mb-4">No tienes compras aún</p>
            <Link to="/products" className="btn-secondary py-2 px-6 rounded-lg">Explorar juegos</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="card p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="font-bold text-white">Orden #{order.id}</h3>
                    <p className="text-sm text-[#A0A0A0]">{new Date(order.fecha).toLocaleDateString('es-PE')}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      order.estadoClave === 'entregado'
                        ? 'bg-[#00CFFF]/20 text-[#00CFFF]'
                        : 'bg-[#FFD700]/20 text-[#FFD700]'
                    }`}
                  >
                    {order.estadoClave === 'entregado' ? 'Clave Entregada' : 'Pendiente'}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  {order.productos.map(producto => (
                    <div key={producto.id} className="flex justify-between text-sm">
                      <span className="text-[#A0A0A0]">{producto.title} x{producto.quantity}</span>
                      <span className="text-white">${(producto.price * producto.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-white">Total:</span>
                  <span className="font-bold text-[#00CFFF] text-lg">${order.total.toFixed(2)}</span>
                </div>

                {order.estadoClave === 'entregado' && order.claveDigital && (
                  <div className="bg-[#00CFFF]/10 rounded-lg p-3 mb-4 border border-[#00CFFF]/30">
                    <p className="text-xs text-[#A0A0A0] mb-1">Clave Digital:</p>
                    <p className="text-lg font-mono font-bold text-[#FFD700] tracking-wider">{order.claveDigital}</p>
                  </div>
                )}

                {order.estadoClave === 'pendiente' && (
                  <div className="bg-[#FFD700]/10 rounded-lg p-3 mb-4 border border-[#FFD700]/30">
                    <p className="text-sm text-[#FFD700]">Clave digital en proceso de entrega...</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleViewBoleta(order.id)}
                    className="btn-outline py-2 px-4 rounded-lg text-sm"
                  >
                    Ver boleta
                  </button>
                  <button
                    onClick={() => handleDownloadPDF(order)}
                    className="btn-secondary py-2 px-4 rounded-lg text-sm"
                  >
                    Descargar PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
