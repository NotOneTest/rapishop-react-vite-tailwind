import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { cart } = useCart()
  const { user, isAuthenticated, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  const navLinks = (
    <>
      <Link to="/" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-[#A0A0A0] hover:text-[#00CFFF] transition-colors">Inicio</Link>
      <Link to="/products" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-[#A0A0A0] hover:text-[#00CFFF] transition-colors">Tienda</Link>
      <Link to="/feedback" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-[#A0A0A0] hover:text-[#00CFFF] transition-colors">Opiniones</Link>
      <Link to="/cart" onClick={() => setMenuOpen(false)} className="relative text-sm font-medium text-[#A0A0A0] hover:text-[#00CFFF] transition-colors">
        Carrito
        {totalItems > 0 && (
          <span className="absolute -top-2.5 -right-3 bg-gradient-to-r from-[#00CFFF] to-[#00A8BB] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </Link>
      {isAuthenticated ? (
        <>
          <Link to="/perfil" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-[#A0A0A0] hover:text-[#00CFFF] transition-colors">
            Perfil
          </Link>
          <button
            onClick={() => { logout(); setMenuOpen(false); }}
            className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
          >
            Salir
          </button>
        </>
      ) : (
        <Link to="/login" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-[#FFD700] hover:text-[#E6C200] transition-colors">
          Ingresar
        </Link>
      )}
    </>
  )

  return (
    <nav className="navbar-gaming sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-[#FFD700] to-[#E6C200] flex items-center justify-center group-hover:shadow-lg transition-shadow">
              <span className="text-black font-black text-sm">R</span>
            </div>
            <span className="text-xl font-bold text-white">
              RAPI<span className="text-[#FFD700]">SHOP</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-[#1A1F2E] pt-4">
            <div className="flex flex-col gap-4">
              {navLinks}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
