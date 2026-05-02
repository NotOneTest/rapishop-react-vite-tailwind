import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Navbar() {
  const { cart } = useCart()
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="navbar-gaming sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-[#FFD700] to-[#E6C200] flex items-center justify-center group-hover:shadow-lg transition-shadow">
              <span className="text-black font-black text-sm">R</span>
            </div>
            <span className="text-xl font-bold text-white">
              RAPI<span className="text-[#FFD700]">SHOP</span>
            </span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-sm font-medium text-[#A0A0A0] hover:text-[#00CFFF] transition-colors"
            >
              Inicio
            </Link>
            <Link
              to="/products"
              className="text-sm font-medium text-[#A0A0A0] hover:text-[#00CFFF] transition-colors"
            >
              Tienda
            </Link>
            <Link
              to="/feedback"
              className="text-sm font-medium text-[#A0A0A0] hover:text-[#00CFFF] transition-colors"
            >
              Opiniones
            </Link>
            <Link
              to="/cart"
              className="relative text-sm font-medium text-[#A0A0A0] hover:text-[#00CFFF] transition-colors"
            >
              Carrito
              {totalItems > 0 && (
                <span className="absolute -top-2.5 -right-3 bg-gradient-to-r from-[#00CFFF] to-[#00A8BB] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
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
