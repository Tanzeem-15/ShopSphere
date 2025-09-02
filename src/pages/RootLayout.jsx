import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import ScrollToTop from '../components/ScrollToTop.jsx'
import { useAuth } from '../auth/AuthContext.jsx'
import { useCart } from '../cart/CartContext.jsx'

const setActive = ({ isActive }) => 'pill' + (isActive ? ' active' : '')

export default function RootLayout(){
  const { user, logout } = useAuth()
  const { items } = useCart()
  const count = items.reduce((s, i) => s + i.qty, 0)

  return (
    <>
      <nav>
        <div className="nav-inner container">
          <Link className="brand" to="/">🛒 ShopSphere</Link>
          <NavLink to="/" end className={setActive}>Home</NavLink>
          <NavLink to="/products" className={setActive}>Products</NavLink>
          <NavLink to="/cart" className={setActive}>Cart ({count})</NavLink>
          <NavLink to="/dashboard" className={setActive}>Dashboard</NavLink>
          <div className="right" />
          {user ? (
            <div className="stack">
              <span className="tag">Hi, {user.name}</span>
              <button className="button secondary" onClick={logout}>Logout</button>
            </div>
          ) : (
            <NavLink to="/login" className={setActive}>Login</NavLink>
          )}
        </div>
      </nav>
      <ScrollToTop />
      <div className="container">
        <Breadcrumbs />
        <Outlet />
      </div>
    </>
  )
}
