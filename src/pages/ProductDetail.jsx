// Detalle de producto - Muestra info, descripción y botón agregar al carrito
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById } from '../data/products'
import { useCart } from '../context/CartContext'
import GameImage from '../components/GameImage'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const product = getProductById(id)

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Juego no encontrado</h1>
          <button
            onClick={() => navigate('/products')}
            className="btn-secondary py-2 px-6 rounded-lg"
          >
            Volver al catálogo
          </button>
        </div>
      </div>
    )
  }

  function handleAddToCart() {
    addToCart(product)
    navigate('/cart')
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back button */}
        <button
          onClick={() => navigate('/products')}
          className="text-[#00CFFF] hover:text-[#00A8BB] font-medium mb-4 sm:mb-6 inline-flex items-center gap-2 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al catálogo
        </button>

        {/* Product Card */}
        <div className="card overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image */}
            <div className="aspect-[3/4] bg-[#1A1F2E]">
              <GameImage
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-4 sm:p-8 flex flex-col justify-center">
              {/* Badges */}
              <div className="flex gap-2 mb-4">
                <span className="badge-secondary">{product.category}</span>
                <span className="badge-neutral">{product.platform}</span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-black text-white mb-4">{product.title}</h1>

              {/* Description */}
              <p className="text-[#A0A0A0] mb-6 leading-relaxed">{product.description}</p>

              {/* Price & CTA */}
              {product.price === 0 ? (
                <button
                  onClick={handleAddToCart}
                  className="btn-primary py-3 px-8 rounded-lg text-lg w-full sm:w-auto"
                >
                  Jugar gratis
                </button>
              ) : (
                <div className="space-y-4">
                  <p className="text-3xl sm:text-4xl font-bold text-[#00CFFF]">${product.price.toFixed(2)}</p>
                  <button
                    onClick={handleAddToCart}
                    className="btn-secondary py-3 px-8 rounded-lg text-lg w-full sm:w-auto"
                  >
                    Agregar al carrito
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
