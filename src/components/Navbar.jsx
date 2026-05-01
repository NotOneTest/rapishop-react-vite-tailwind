import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Navbar() {
  const { cart } = useCart()
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="bg-gray-900 border-b border-gray-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-extrabold text-cyan-400 hover:text-cyan-300 transition tracking-tight">
            RapiShop
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-cyan-400 transition font-medium text-sm">
              Inicio
            </Link>
            <Link to="/products" className="hover:text-cyan-400 transition font-medium text-sm">
              Tienda
            </Link>
            <Link to="/cart" className="relative hover:text-cyan-400 transition font-medium text-sm">
              Carrito
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-4 bg-cyan-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
