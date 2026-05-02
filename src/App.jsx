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

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/products', element: <Products /> },
      { path: '/product/:id', element: <ProductDetail /> },
      { path: '/cart', element: <Cart /> },
      { path: '/checkout', element: <ProtectedRoute><Checkout /></ProtectedRoute> },
      { path: '/feedback', element: <Feedback /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/perfil', element: <ProtectedRoute><Profile /></ProtectedRoute> },
      { path: '/confirmacion', element: <ProtectedRoute><PurchaseConfirmation /></ProtectedRoute> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
