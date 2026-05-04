import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'
import GameImage from '../components/GameImage'

function Products() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const categories = useMemo(() => [...new Set(products.map(p => p.category))], [])

  const filtered = useMemo(() => {
    return products.filter(p => {
      if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false
      if (category && p.category !== category) return false
      if (maxPrice && p.price > Number(maxPrice)) return false
      return true
    })
  }, [search, category, maxPrice])

  return (
    <div className="min-h-screen bg-[#0B0F1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-white mb-2">
            Catálogo de <span className="text-[#00CFFF]">juegos</span>
          </h1>
          <p className="text-[#A0A0A0]">{filtered.length} títulos disponibles</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar juego..."
            aria-label="Buscar juego por nombre"
            className="input-gaming flex-1"
          />
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            aria-label="Filtrar por categoría"
            className="input-gaming"
          >
            <option value="">Todas las categorías</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
            aria-label="Filtrar por precio máximo"
            className="input-gaming"
          >
            <option value="">Cualquier precio</option>
            <option value="10">Hasta $10</option>
            <option value="30">Hasta $30</option>
            <option value="60">Hasta $60</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(product => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="card group"
              aria-label={`Ver detalles de ${product.title}, precio: ${product.price === 0 ? 'Gratis' : '$' + product.price.toFixed(2)}`}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <GameImage
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {product.price === 0 && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                    <span className="badge-primary text-sm">Free to Play</span>
                  </div>
                )}
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

        {filtered.length === 0 && (
          <p className="text-center text-[#A0A0A0] mt-8">No se encontraron juegos con esos filtros.</p>
        )}
      </div>
    </div>
  )
}

export default Products
