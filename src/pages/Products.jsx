import { Link } from 'react-router-dom'
import { products } from '../data/products'
import GameImage from '../components/GameImage'

function Products() {
  return (
    <div className="min-h-screen bg-[#0B0F1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-white mb-2">
            Catálogo de <span className="text-[#00CFFF]">juegos</span>
          </h1>
          <p className="text-[#A0A0A0]">{products.length} títulos disponibles</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="card group"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <GameImage
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Free overlay */}
                {product.price === 0 && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                    <span className="badge-primary text-sm">Free to Play</span>
                  </div>
                )}

                {/* Badges */}
                <span className="absolute top-2 left-2 badge-secondary text-xs">
                  {product.category}
                </span>
                <span className="absolute top-2 right-2 badge-neutral text-xs">
                  {product.platform}
                </span>
              </div>

              <div className="p-4">
                <h2 className="font-semibold text-white mb-2 truncate group-hover:text-[#00CFFF] transition-colors">
                  {product.title}
                </h2>

                <div className="flex items-center justify-between">
                  {product.price === 0 ? (
                    <span className="text-[#FFD700] font-bold text-lg">Gratis</span>
                  ) : (
                    <span className="text-[#00CFFF] font-bold text-xl">${product.price.toFixed(2)}</span>
                  )}
                  <span className="text-[#A0A0A0] group-hover:text-[#00CFFF] text-sm transition-colors">
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
