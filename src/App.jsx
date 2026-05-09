// ROUTER PRINCIPAL - React Router v7
// Define rutas publicas y protegidas

import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Feedback from './pages/Feedback'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import PurchaseConfirmation from './pages/PurchaseConfirmation'

// LAYOUT - Componente con estructura comun (Navbar + Outlet)
// Outlet es donde se renderiza el contenido de la ruta activa
function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

// CONFIGURACION DE RUTAS
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/products', element: <Products /> },
      // Ruta DINAMICA con parametro :id (ej: /product/1)
      { path: '/product/:id', element: <ProductDetail /> },
      { path: '/cart', element: <Cart /> },
      // Rutas protegidas: requieren autenticacion (ProtectedRoute)
      { path: '/checkout', element: <ProtectedRoute><Checkout /></ProtectedRoute> },
      { path: '/feedback', element: <Feedback /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/perfil', element: <ProtectedRoute><Profile /></ProtectedRoute> },
      { path: '/confirmacion', element: <ProtectedRoute><PurchaseConfirmation /></ProtectedRoute> },
    ],
  },
])

// COMPONENTE RAIZ - Conecta el router con React
function App() {
  return <RouterProvider router={router} />
}

export default App
