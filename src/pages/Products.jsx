import { Link } from 'react-router-dom'
import { products } from '../data/products'

function Products() {
  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-extrabold text-white mb-2">Catálogo de juegos</h1>
        <p className="text-gray-400 mb-10">{products.length} títulos disponibles</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all group"
            >
              <div className="relative overflow-hidden aspect-[3/4]">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.price === 0 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-green-400 font-extrabold text-2xl">Free to Play</span>
                  </div>
                )}
                <span className="absolute top-2 left-2 bg-cyan-600/90 text-white text-xs font-bold px-2 py-1 rounded">
                  {product.category}
                </span>
                <span className="absolute top-2 right-2 bg-gray-900/80 text-gray-300 text-xs px-2 py-1 rounded">
                  {product.platform}
                </span>
              </div>
              <div className="p-4">
                <h2 className="font-semibold text-white mb-2 truncate">{product.title}</h2>
                <div className="flex items-center justify-between">
                  {product.price === 0 ? (
                    <span className="text-green-400 font-bold text-lg">Gratis</span>
                  ) : (
                    <span className="text-cyan-400 font-bold text-xl">${product.price.toFixed(2)}</span>
                  )}
                  <span className="text-gray-500 group-hover:text-cyan-400 text-sm transition">
                    Ver más →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Products
