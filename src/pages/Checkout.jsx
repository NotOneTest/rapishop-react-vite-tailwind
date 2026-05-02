import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Checkout() {
  const navigate = useNavigate()
  const { cart, clearCart } = useCart()
  const [paymentMethod, setPaymentMethod] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    yapePhone: '',
    otherMethod: ''
  })

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const total = subtotal

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!paymentMethod) return
    clearCart()
    navigate('/')
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">No hay productos para pagar</h1>
          <p className="text-[#A0A0A0] mb-8">Agrega productos al carrito primero</p>
          <Link to="/products" className="btn-secondary py-3 px-8 rounded-lg">
            Explorar juegos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-black text-white mb-8">
          Checkout <span className="text-[#A0A0A0] text-lg font-normal">Finaliza tu compra</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="card p-6">
                <h2 className="text-xl font-bold text-white mb-4">Datos de contacto</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-[#A0A0A0] mb-1">Nombre completo</label>
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
                </div>
              </div>

              <div className="card p-6">
                <h2 className="text-xl font-bold text-white mb-4">Método de pago</h2>
                <div className="space-y-3">
                  <label className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                    paymentMethod === 'yape'
                      ? 'border-[#A020F0] bg-[#A020F0]/10'
                      : 'border-[#1A1F2E] hover:border-[#A020F0]'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="yape"
                      checked={paymentMethod === 'yape'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 rounded bg-[#A020F0] flex items-center justify-center text-white font-bold text-sm">
                        Y
                      </div>
                      <span className="text-white font-medium">Yape</span>
                    </div>
                  </label>

                  <label className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#00CFFF] bg-[#00CFFF]/10'
                      : 'border-[#1A1F2E] hover:border-[#00CFFF]'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 rounded border-2 border-[#00CFFF] flex items-center justify-center">
                        <svg className="w-5 h-5 text-[#00CFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="text-white font-medium">Tarjeta</span>
                    </div>
                  </label>

                  <label className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                    paymentMethod === 'other'
                      ? 'border-[#FFD700] bg-[#FFD700]/10'
                      : 'border-[#1A1F2E] hover:border-[#FFD700]'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="other"
                      checked={paymentMethod === 'other'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 rounded border-2 border-[#FFD700] flex items-center justify-center">
                        <span className="text-[#FFD700] font-bold">?</span>
                      </div>
                      <span className="text-white font-medium">Otro método</span>
                    </div>
                  </label>
                </div>
              </div>

              {paymentMethod === 'card' && (
                <div className="card p-6">
                  <h2 className="text-lg font-bold text-white mb-4">Datos de tarjeta</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-[#A0A0A0] mb-1">Número de tarjeta</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        className="input-gaming w-full"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-[#A0A0A0] mb-1">Vencimiento</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleChange}
                          className="input-gaming w-full"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-[#A0A0A0] mb-1">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          className="input-gaming w-full"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'yape' && (
                <div className="card p-6">
                  <h2 className="text-lg font-bold text-white mb-4">Datos de Yape</h2>
                  <div>
                    <label className="block text-sm text-[#A020F0] mb-1">Número de celular</label>
                    <input
                      type="tel"
                      name="yapePhone"
                      value={formData.yapePhone}
                      onChange={handleChange}
                      className="input-gaming w-full"
                      placeholder="999 999 999"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'other' && (
                <div className="card p-6">
                  <h2 className="text-lg font-bold text-white mb-4">Otro método de pago</h2>
                  <div>
                    <label className="block text-sm text-[#A0A0A0] mb-1">Especifica el método</label>
                    <input
                      type="text"
                      name="otherMethod"
                      value={formData.otherMethod}
                      onChange={handleChange}
                      className="input-gaming w-full"
                      placeholder="Ej: Transferencia, PayPal, etc."
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="card p-6">
                <h2 className="text-xl font-bold text-white mb-4">Resumen</h2>
                <div className="space-y-3 mb-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-[#A0A0A0]">{item.title} x{item.quantity}</span>
                      <span className="text-white">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <hr className="border-[#1A1F2E] my-4" />
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-white">Total</span>
                  <span className="text-[#00CFFF]">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={!paymentMethod}
                className="btn-primary w-full py-4 rounded-lg text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirmar compra
              </button>

              <Link
                to="/cart"
                className="block text-center text-[#A0A0A0] hover:text-[#00CFFF] transition-colors"
              >
                ← Volver al carrito
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Checkout
