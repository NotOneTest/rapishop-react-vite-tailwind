import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { cart } = useCart()
  const { user, isAuthenticated, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  function handleLogout() {
    logout()
    setMenuOpen(false)
  }

  const navLinks = (
    <>
      <Link to="/" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-[#A0A0A0] hover:text-[#00CFFF] transition-colors" tabIndex={menuOpen ? 0 : -1}>Inicio</Link>
      <Link to="/products" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-[#A0A0A0] hover:text-[#00CFFF] transition-colors" tabIndex={menuOpen ? 0 : -1}>Tienda</Link>
      <Link to="/feedback" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-[#A0A0A0] hover:text-[#00CFFF] transition-colors" tabIndex={menuOpen ? 0 : -1}>Opiniones</Link>
      <Link to="/cart" onClick={() => setMenuOpen(false)} className="relative text-sm font-medium text-[#A0A0A0] hover:text-[#00CFFF] transition-colors" tabIndex={menuOpen ? 0 : -1} aria-label={`Carrito de compras, ${totalItems} ${totalItems === 1 ? 'juego' : 'juegos'}`}>
        Carrito
        {totalItems > 0 && (
          <span className="absolute -top-2.5 -right-3 bg-gradient-to-r from-[#00CFFF] to-[#00A8BB] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center" aria-hidden="true">
            {totalItems}
          </span>
        )}
      </Link>
      {isAuthenticated ? (
        <>
          <Link to="/perfil" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-[#A0A0A0] hover:text-[#00CFFF] transition-colors" tabIndex={menuOpen ? 0 : -1}>Perfil</Link>
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors text-left"
            tabIndex={menuOpen ? 0 : -1}
          >
            Salir
          </button>
        </>
      ) : (
        <Link to="/login" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-[#FFD700] hover:text-[#E6C200] transition-colors" tabIndex={menuOpen ? 0 : -1}>Ingresar</Link>
      )}
    </>
  )

  return (
    <nav className="navbar-gaming sticky top-0 z-50" role="navigation" aria-label="Navegación principal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group" aria-label="Rapishop, ir a inicio">
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
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
          <div className="md:hidden pb-4 border-t border-[#1A1F2E] pt-4" id="mobile-menu">
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
