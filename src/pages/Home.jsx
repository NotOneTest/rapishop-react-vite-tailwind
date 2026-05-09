// Página de inicio - Hero section y características de la tienda
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen bg-[#0B0F1A]">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00CFFF]/5 via-transparent to-transparent"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">
            Tu tienda de <span className="text-[#FFD700] text-glow-primary">videojuegos</span>
          </h1>

          <p className="text-xl text-[#A0A0A0] mb-10 max-w-2xl mx-auto">
            Los mejores títulos al mejor precio. Entrega digital inmediata, ofertas exclusivas y una biblioteca que crece contigo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="btn-secondary py-3 px-8 rounded-lg text-lg"
            >
              Explorar catálogo
            </Link>
            <Link
              to="/cart"
              className="btn-outline py-3 px-8 rounded-lg text-lg"
            >
              Ver carrito
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="card p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-[#00CFFF]/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#00CFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Entrega inmediata</h3>
              <p className="text-[#A0A0A0] text-sm">Recibe tu clave digital al instante tras la compra</p>
            </div>

            <div className="card p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-[#FFD700]/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .89-3 2s1.343 2 3 2 3 .89 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Mejores precios</h3>
              <p className="text-[#A0A0A0] text-sm">Ofertas diarias y descuentos de hasta el 80%</p>
            </div>

            <div className="card p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-[#00CFFF]/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#00CFFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Biblioteca personal</h3>
              <p className="text-[#A0A0A0] text-sm">Todos tus juegos en un solo lugar, siempre accesibles</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
