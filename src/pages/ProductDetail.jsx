import { useParams, useNavigate } from 'react-router-dom'
import { getProductById } from '../data/products'
import { useCart } from '../context/CartContext'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const product = getProductById(id)

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Juego no encontrado</h1>
          <button
            onClick={() => navigate('/products')}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg transition"
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
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate('/products')}
          className="text-cyan-400 hover:text-cyan-300 font-medium mb-6 inline-block"
        >
          ← Volver al catálogo
        </button>

        <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="aspect-[3/4] md:aspect-auto bg-gray-800">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <div className="flex gap-2 mb-4">
                <span className="bg-cyan-600/20 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  {product.category}
                </span>
                <span className="bg-gray-700 text-gray-300 text-xs font-bold px-3 py-1 rounded-full">
                  {product.platform}
                </span>
              </div>
              <h1 className="text-3xl font-extrabold text-white mb-4">{product.title}</h1>
              <p className="text-gray-400 mb-6 leading-relaxed">{product.description}</p>

              {product.price === 0 ? (
                <button
                  onClick={handleAddToCart}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition text-lg w-full sm:w-auto"
                >
                  Jugar gratis
                </button>
              ) : (
                <div className="space-y-4">
                  <p className="text-4xl font-bold text-cyan-400">${product.price.toFixed(2)}</p>
                  <button
                    onClick={handleAddToCart}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg transition text-lg w-full sm:w-auto"
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
