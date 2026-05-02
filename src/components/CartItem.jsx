import { useCart } from '../context/CartContext'

function CartItem({ product }) {
  const { updateQuantity, removeFromCart } = useCart()

  return (
    <div className="card p-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Image */}
        <img
          src={product.image}
          alt={product.title}
          className="w-16 h-20 object-cover rounded sm:flex-shrink-0"
        />

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate">{product.title}</h3>
          <span className="text-xs text-[#A0A0A0]">{product.category}</span>
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between sm:justify-end gap-4">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(product.id, product.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center rounded bg-[#1A1F2E] hover:bg-[#00CFFF]/20 transition-colors text-white font-bold"
            >
              -
            </button>
            <span className="w-8 text-center text-white font-medium">{product.quantity}</span>
            <button
              onClick={() => updateQuantity(product.id, product.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center rounded bg-[#1A1F2E] hover:bg-[#00CFFF]/20 transition-colors text-white font-bold"
            >
              +
            </button>
          </div>

          {/* Price */}
          <p className="font-semibold text-[#00CFFF] sm:w-20 text-right">
            ${(product.price * product.quantity).toFixed(2)}
          </p>

          {/* Remove Button */}
          <button
            onClick={() => removeFromCart(product.id)}
            className="text-red-400 hover:text-red-300 transition-colors text-sm"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
