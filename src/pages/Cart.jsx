import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import CartItem from '../components/CartItem'

function Cart() {
  const { cart, clearCart } = useCart()
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const total = subtotal

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Tu carrito está vacío</h1>
          <p className="text-gray-400 mb-8">Explora el catálogo y agrega tus juegos favoritos</p>
          <Link
            to="/products"
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg transition"
          >
            Explorar juegos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-white">
            Carrito ({cart.reduce((sum, item) => sum + item.quantity, 0)} juegos)
          </h1>
          <button
            onClick={clearCart}
            className="text-red-400 hover:text-red-300 hover:bg-red-500/10 font-medium py-2 px-4 rounded-lg transition"
          >
            Vaciar carrito
          </button>
        </div>

        <div className="space-y-4 mb-8">
          {cart.map(item => (
            <CartItem key={item.id} product={item} />
          ))}
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 space-y-3">
          <div className="flex justify-between text-gray-400">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <hr className="border-gray-800" />
          <div className="flex justify-between text-xl font-bold text-white">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
