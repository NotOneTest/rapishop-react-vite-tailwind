import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-6">
            Tu tienda de <span className="text-cyan-400">videojuegos</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Los mejores títulos al mejor precio. Entrega digital inmediata, ofertas exclusivas y una biblioteca que crece contigo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg transition text-lg"
            >
              Explorar catálogo
            </Link>
            <Link
              to="/cart"
              className="bg-transparent border-2 border-white/30 hover:bg-white/10 text-white font-bold py-3 px-8 rounded-lg transition text-lg"
            >
              Ver carrito
            </Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
            <h3 className="text-2xl font-bold mb-2 text-cyan-400">Entrega inmediata</h3>
            <p className="text-gray-400">Recibe tu clave digital al instante tras la compra</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
            <h3 className="text-2xl font-bold mb-2 text-cyan-400">Mejores precios</h3>
            <p className="text-gray-400">Ofertas diarias y descuentos de hasta el 80%</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
            <h3 className="text-2xl font-bold mb-2 text-cyan-400">Biblioteca personal</h3>
            <p className="text-gray-400">Todos tus juegos en un solo lugar, siempre accesibles</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
