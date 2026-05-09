// Página del carrito - Lista productos, calcula total y redirige a checkout
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import CartItem from '../components/CartItem'

function Cart() {
  const { cart, clearCart } = useCart()
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const total = subtotal

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Tu carrito está vacío</h1>
          <p className="text-[#A0A0A0] mb-8">Explora el catálogo y agrega tus juegos favoritos</p>
          <Link to="/products" className="btn-secondary py-3 px-8 rounded-lg">
            Explorar juegos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Carrito <span className="text-[#A0A0A0] text-base sm:text-lg font-normal">({cart.reduce((sum, item) => sum + item.quantity, 0)} juegos)</span>
          </h1>
          <button
            onClick={clearCart}
            className="text-red-400 hover:text-red-300 font-medium py-2 px-4 transition-colors"
            aria-label="Vaciar todo el carrito"
          >
            Vaciar carrito
          </button>
        </div>

        <div className="space-y-4 mb-8" aria-label="Lista de productos en el carrito">
          {cart.map(item => (
            <CartItem key={item.id} product={item} />
          ))}
        </div>

        <div className="card p-6 space-y-4">
          <div className="flex justify-between text-[#A0A0A0]">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <hr className="border-[#1A1F2E]" />
          <div className="flex justify-between text-xl font-bold text-white">
            <span>Total</span>
            <span className="text-[#00CFFF]">${total.toFixed(2)}</span>
          </div>

          <Link to="/checkout" className="block">
            <button className="btn-primary w-full py-3 rounded-lg text-lg font-semibold" aria-label="Proceder al pago">
              Proceder al pago
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cart
