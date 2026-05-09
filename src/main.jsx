// PUNTO DE ENTRADA - Renderiza la app y envuelve con Providers

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import App from './App.jsx'
import './index.css'

// createRoot: punto de montaje (busca div#root en index.html)
createRoot(document.getElementById('root')).render(
  // StrictMode: checks adicionales en desarrollo
  <StrictMode>
    {/* Providers anidados - todo componente tiene acceso a Auth y Cart */}
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
