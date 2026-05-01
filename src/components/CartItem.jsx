import { useCart } from '../context/CartContext'

function CartItem({ product }) {
  const { updateQuantity, removeFromCart } = useCart()

  return (
    <div className="flex items-center gap-4 bg-gray-900 border border-gray-800 p-4 rounded-lg">
      <img
        src={product.image}
        alt={product.title}
        className="w-16 h-20 object-cover rounded"
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-white truncate">{product.title}</h3>
        <span className="text-xs text-gray-500">{product.category}</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(product.id, product.quantity - 1)}
          className="w-8 h-8 flex items-center justify-center rounded bg-gray-800 hover:bg-gray-700 transition text-white font-bold"
        >
          -
        </button>
        <span className="w-8 text-center text-white font-medium">{product.quantity}</span>
        <button
          onClick={() => updateQuantity(product.id, product.quantity + 1)}
          className="w-8 h-8 flex items-center justify-center rounded bg-gray-800 hover:bg-gray-700 transition text-white font-bold"
        >
          +
        </button>
      </div>
      <p className="font-semibold text-cyan-400 w-20 text-right">
        ${(product.price * product.quantity).toFixed(2)}
      </p>
      <button
        onClick={() => removeFromCart(product.id)}
        className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-2 rounded transition text-sm"
      >
        Eliminar
      </button>
    </div>
  )
}

export default CartItem
