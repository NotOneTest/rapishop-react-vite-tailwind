// PAGINA DE PAGO - Checkout
// Valida metodo de pago, guarda orden en backend, genera clave digital

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const API_URL = 'http://localhost:3001/api'

// Genera clave digital simulada (XXXX-XXXX-XXXX)
function generateDigitalKey() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const segments = []

  for (let i = 0; i < 3; i++) {
    let segment = ''
    for (let j = 0; j < 4; j++) {
      segment += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    segments.push(segment)
  }

  return segments.join('-')
}

// Validacion de tarjeta con REGEX
function validateCard(formData) {
  const errors = {}

  if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/.test(formData.name)) {
    errors.name = 'Nombre inválido'
  }
  if (!/^\d{13,19}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
    errors.cardNumber = 'Número de tarjeta inválido'
  }
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
    errors.expiryDate = 'Formato MM/YY requerido'
  }
  if (!/^\d{3,4}$/.test(formData.cvv)) {
    errors.cvv = 'CVV inválido'
  }

  return errors
}

// Validacion de Yape (9 digitos, empieza con 9)
function validateYape(formData) {
  const errors = {}

  if (!/^9\d{8}$/.test(formData.yapePhone.replace(/\s/g, ''))) {
    errors.yapePhone = 'Ingresa un número válido (9 dígitos, empieza con 9)'
  }

  return errors
}

function Checkout() {
  const navigate = useNavigate()
  const { cart, clearCart } = useCart()
  const { user, isAuthenticated } = useAuth()

  const [paymentMethod, setPaymentMethod] = useState('')
  const [formData, setFormData] = useState({
    name: '', email: '', cardNumber: '', expiryDate: '', cvv: '', yapePhone: '', otherMethod: ''
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  // Calcular total con reduce()
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const total = subtotal

  // Procesar formulario de checkout
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!paymentMethod) return
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    // Validacion segun metodo de pago
    let validationErrors = {}
    if (paymentMethod === 'card') {
      validationErrors = validateCard(formData)
    } else if (paymentMethod === 'yape') {
      validationErrors = validateYape(formData)
    } else if (paymentMethod === 'other' && !formData.otherMethod.trim()) {
      validationErrors.otherMethod = 'Especifica el método de pago'
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setSubmitting(true)

    const claveDigital = generateDigitalKey()
    const order = {
      userId: user.id,
      productos: cart,
      total,
      estadoClave: 'pendiente',
      claveDigital
    }

    // Enviar orden al backend
    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      })
      const data = await res.json()

      if (data.success) {
        order.id = data.order.id
        order.fecha = data.order.fecha
      }
    } catch {
      // Fallback: generar ID local si falla la conexion
      order.id = Date.now()
      order.fecha = new Date().toISOString()
    }

    clearCart()
    setSubmitting(false)

    // Pasar orden via state a la siguiente ruta
    navigate('/confirmacion', { state: { order } })
  }

  // Actualizar campos del formulario dinamicamente
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: undefined })
  }

  // Mostrar mensaje si carrito vacio
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">No hay productos para pagar</h1>
          <p className="text-[#A0A0A0] mb-8">Agrega productos al carrito primero</p>
          <Link to="/products" className="btn-secondary py-3 px-8 rounded-lg">Explorar juegos</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl font-black text-white mb-6 sm:mb-8">
          Checkout <span className="text-[#A0A0A0] text-base sm:text-lg font-normal">Finaliza tu compra</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="space-y-6">
              {/* Datos de contacto */}
              <div className="card p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-white mb-4">Datos de contacto</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="checkout-name" className="block text-sm text-[#A0A0A0] mb-1">Nombre completo</label>
                    <input id="checkout-name" type="text" name="name" value={formData.name} onChange={handleChange} className={`input-gaming w-full ${errors.name ? 'border-red-500' : ''}`} placeholder="Tu nombre" required aria-invalid={!!errors.name} aria-describedby={errors.name ? 'checkout-name-error' : undefined} />
                    {errors.name && <p id="checkout-name-error" className="text-red-400 text-xs mt-1" role="alert">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="checkout-email" className="block text-sm text-[#A0A0A0] mb-1">Email</label>
                    <input id="checkout-email" type="email" name="email" value={formData.email} onChange={handleChange} className="input-gaming w-full" placeholder="tu@email.com" required />
                  </div>
                </div>
              </div>

              {/* Metodos de pago */}
              <div className="card p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-white mb-4">Método de pago</h2>
                <div className="space-y-3">
                  {[
                    { value: 'yape', color: '#A020F0', label: 'Yape', letter: 'Y' },
                    { value: 'card', color: '#00CFFF', label: 'Tarjeta', icon: true },
                    { value: 'other', color: '#FFD700', label: 'Otro método', letter: '?' }
                  ].map(m => (
                    <label key={m.value} className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${paymentMethod === m.value ? `border-[${m.color}] bg-[${m.color}]/10` : 'border-[#1A1F2E] hover:border-[${m.color}]'}`}>
                      <input type="radio" name="payment" value={m.value} checked={paymentMethod === m.value} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4" aria-label={`Pagar con ${m.label}`} />
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`w-10 h-10 rounded flex items-center justify-center ${m.icon ? 'border-2 border-[#00CFFF]' : 'bg-[${m.color}]'}`}>
                          {m.icon ? (
                            <svg className="w-5 h-5 text-[#00CFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          ) : (
                            <span className={`font-bold text-sm ${m.value === 'other' ? 'text-[#FFD700]' : 'text-white'}`}>{m.letter}</span>
                          )}
                        </div>
                        <span className="text-white font-medium">{m.label}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Formularios condicionales segun metodo */}
              {paymentMethod === 'card' && (
                <div className="card p-4 sm:p-6">
                  <h2 className="text-base sm:text-lg font-bold text-white mb-4">Datos de tarjeta</h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="card-number" className="block text-sm text-[#A0A0A0] mb-1">Número de tarjeta</label>
                      <input id="card-number" type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} inputMode="numeric" maxLength={19} className={`input-gaming w-full ${errors.cardNumber ? 'border-red-500' : ''}`} placeholder="1234 5678 9012 3456" aria-invalid={!!errors.cardNumber} aria-describedby={errors.cardNumber ? 'card-number-error' : undefined} />
                      {errors.cardNumber && <p id="card-number-error" className="text-red-400 text-xs mt-1" role="alert">{errors.cardNumber}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><label htmlFor="expiry" className="block text-sm text-[#A0A0A0] mb-1">Vencimiento</label><input id="expiry" type="text" name="expiryDate" value={formData.expiryDate} onChange={handleChange} inputMode="numeric" maxLength={5} className={`input-gaming w-full ${errors.expiryDate ? 'border-red-500' : ''}`} placeholder="MM/YY" aria-invalid={!!errors.expiryDate} aria-describedby={errors.expiryDate ? 'expiry-error' : undefined} />{errors.expiryDate && <p id="expiry-error" className="text-red-400 text-xs mt-1" role="alert">{errors.expiryDate}</p>}</div>
                      <div><label htmlFor="cvv" className="block text-sm text-[#A0A0A0] mb-1">CVV</label><input id="cvv" type="text" name="cvv" value={formData.cvv} onChange={handleChange} inputMode="numeric" maxLength={4} className={`input-gaming w-full ${errors.cvv ? 'border-red-500' : ''}`} placeholder="123" aria-invalid={!!errors.cvv} aria-describedby={errors.cvv ? 'cvv-error' : undefined} />{errors.cvv && <p id="cvv-error" className="text-red-400 text-xs mt-1" role="alert">{errors.cvv}</p>}</div>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'yape' && (
                <div className="card p-4 sm:p-6">
                  <h2 className="text-base sm:text-lg font-bold text-white mb-4">Datos de Yape</h2>
                  <div>
                    <label htmlFor="yape-phone" className="block text-sm text-[#A020F0] mb-1">Número de celular</label>
                    <input id="yape-phone" type="tel" name="yapePhone" value={formData.yapePhone} onChange={handleChange} inputMode="numeric" maxLength={9} className={`input-gaming w-full ${errors.yapePhone ? 'border-red-500' : ''}`} placeholder="999 999 999" aria-invalid={!!errors.yapePhone} aria-describedby={errors.yapePhone ? 'yape-error' : undefined} />
                    {errors.yapePhone && <p id="yape-error" className="text-red-400 text-xs mt-1" role="alert">{errors.yapePhone}</p>}
                  </div>
                </div>
              )}

              {paymentMethod === 'other' && (
                <div className="card p-4 sm:p-6">
                  <h2 className="text-base sm:text-lg font-bold text-white mb-4">Otro método de pago</h2>
                  <div>
                    <label htmlFor="other-method" className="block text-sm text-[#A0A0A0] mb-1">Especifica el método</label>
                    <input id="other-method" type="text" name="otherMethod" value={formData.otherMethod} onChange={handleChange} className={`input-gaming w-full ${errors.otherMethod ? 'border-red-500' : ''}`} placeholder="Ej: Transferencia, PayPal, etc." aria-invalid={!!errors.otherMethod} aria-describedby={errors.otherMethod ? 'other-error' : undefined} />
                    {errors.otherMethod && <p id="other-error" className="text-red-400 text-xs mt-1" role="alert">{errors.otherMethod}</p>}
                  </div>
                </div>
              )}
            </div>

            {/* Resumen y boton */}
            <div className="space-y-6">
              <div className="card p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-white mb-4">Resumen</h2>
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
              <button type="submit" disabled={!paymentMethod || submitting} className="btn-primary w-full py-4 rounded-lg text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed" aria-label="Confirmar compra">
                {submitting ? 'Procesando...' : 'Confirmar compra'}
              </button>
              <Link to="/cart" className="block text-center text-[#A0A0A0] hover:text-[#00CFFF] transition-colors">← Volver al carrito</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Checkout
