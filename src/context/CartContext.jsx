// CONTEXT API DEL CARRITO
// Gestiona estado global del carrito: agregar, eliminar, actualizar cantidades.
// Usa localStorage para persistir entre sesiones.

/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react'
import { loadFromStorage, saveToStorage } from '../utils/storage'

const CartContext = createContext()

// PROVIDER DEL CONTEXT
export function CartProvider({ children }) {
  // Carga carrito desde localStorage o array vacio
  const [cart, setCart] = useState(() => loadFromStorage('rapishop_cart', []))

  // Guardar en localStorage cada vez que cart cambia
  useEffect(() => {
    saveToStorage('rapishop_cart', cart)
  }, [cart])

  // Agregar producto al carrito
  // Si ya existe, incrementa cantidad en 1
  function addToCart(product) {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)

      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...prev, { ...product, quantity: 1 }]
    })
  }

  // Eliminar producto del carrito
  function removeFromCart(id) {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  // Actualizar cantidad de un producto
  // Si quantity < 1, elimina el producto
  function updateQuantity(id, quantity) {
    if (quantity < 1) {
      removeFromCart(id)
      return
    }

    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  // Vaciar carrito
  function clearCart() {
    setCart([])
  }

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

// HOOK PERSONALIZADO para acceder al contexto
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartContext')
  }
  return context
}
