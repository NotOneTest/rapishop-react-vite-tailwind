// Item del carrito - Controla cantidad y elimina productos
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import GameImage from './GameImage'

function CartItem({ product }) {
  const { removeFromCart, updateQuantity } = useCart()

  return (
    <div className="card p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <Link to={`/product/${product.id}`} className="shrink-0" aria-label={`Ver detalles de ${product.title}`}>
        <GameImage
          src={product.image}
          alt={product.title}
          className="w-20 h-24 object-cover rounded-lg"
        />
      </Link>

      <div className="flex-1 min-w-0">
        <Link to={`/product/${product.id}`} className="hover:text-[#00CFFF] transition-colors">
          <h3 className="font-semibold text-white truncate">{product.title}</h3>
        </Link>
        <p className="text-sm text-[#A0A0A0]">{product.category} • {product.platform}</p>
        <p className="text-[#00CFFF] font-bold mt-1">${product.price.toFixed(2)}</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => updateQuantity(product.id, product.quantity - 1)}
          className="w-8 h-8 rounded bg-[#1A1F2E] text-white flex items-center justify-center hover:bg-[#252B3B] transition-colors"
          aria-label={`Reducir cantidad de ${product.title}`}
        >
          −
        </button>
        <span className="text-white font-medium w-6 text-center" aria-label={`Cantidad: ${product.quantity}`}>{product.quantity}</span>
        <button
          onClick={() => updateQuantity(product.id, product.quantity + 1)}
          className="w-8 h-8 rounded bg-[#1A1F2E] text-white flex items-center justify-center hover:bg-[#252B3B] transition-colors"
          aria-label={`Aumentar cantidad de ${product.title}`}
        >
          +
        </button>
      </div>

      <div className="flex items-center gap-4">
        <p className="font-bold text-white">${(product.price * product.quantity).toFixed(2)}</p>
        <button
          onClick={() => removeFromCart(product.id)}
          className="text-red-400 hover:text-red-300 transition-colors px-2 py-1"
          aria-label={`Eliminar ${product.title} del carrito`}
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}

export default CartItem
