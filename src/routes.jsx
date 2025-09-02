import React, { Suspense, lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext.jsx'
import { CartProvider } from './cart/CartContext.jsx'
import RootLayout from './pages/RootLayout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

const Home = lazy(() => import('./pages/Home.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Products = lazy(() => import('./pages/Products.jsx'))
const ProductDetail = lazy(() => import('./pages/ProductDetail.jsx'))
const Cart = lazy(() => import('./pages/Cart.jsx'))
const Checkout = lazy(() => import('./pages/Checkout.jsx'))
const DashboardLayout = lazy(() => import('./pages/DashboardLayout.jsx'))
const Overview = lazy(() => import('./pages/Overview.jsx'))
const Orders = lazy(() => import('./pages/Orders.jsx'))
const Settings = lazy(() => import('./pages/Settings.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

import { productsLoader } from './pages/Products.jsx'
import { productDetailLoader } from './pages/ProductDetail.jsx'

const withSuspense = (el) => <Suspense fallback={<p className="muted">Loading…</p>}>{el}</Suspense>

const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    element: (
      <AuthProvider>
        <CartProvider>
          {withSuspense(<RootLayout />)}
        </CartProvider>
      </AuthProvider>
    ),
    handle: { breadcrumb: 'Home' },
    errorElement: withSuspense(<NotFound />),
    children: [
      { index: true, element: withSuspense(<Home />), handle: { breadcrumb: 'Home' } },
      { path: 'about', element: withSuspense(<About />), handle: { breadcrumb: 'About' } },
      { path: 'products', element: withSuspense(<Products />), loader: productsLoader, handle: { breadcrumb: 'Products' } },
      { path: 'products/:id', element: withSuspense(<ProductDetail />), loader: productDetailLoader, handle: { breadcrumb: (m)=> m.data?.name || 'Product' } },
      { path: 'cart', element: withSuspense(<Cart />), handle: { breadcrumb: 'Cart' } },
      { path: 'checkout',
        element: (
          <ProtectedRoute>
            {withSuspense(<Checkout />)}
          </ProtectedRoute>
        ),
        handle: { breadcrumb: 'Checkout' }
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            {withSuspense(<DashboardLayout />)}
          </ProtectedRoute>
        ),
        handle: { breadcrumb: 'Dashboard' },
        children: [
          { index: true, element: withSuspense(<Overview />), handle: { breadcrumb: 'Overview' } },
          { path: 'overview', element: withSuspense(<Overview />), handle: { breadcrumb: 'Overview' } },
          { path: 'orders', element: withSuspense(<Orders />), handle: { breadcrumb: 'Orders' } },
          { path: 'settings', element: withSuspense(<Settings />), handle: { breadcrumb: 'Settings' } },
        ]
      },
      { path: 'login', element: withSuspense(<Login />), handle: { breadcrumb: 'Login' } },
      { path: '*', element: withSuspense(<NotFound />) }
    ]
  }
])

export default router
