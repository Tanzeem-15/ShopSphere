import React from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'

const setActive = ({ isActive }) => 'pill' + (isActive ? ' active' : '')

export default function DashboardLayout(){
  const loc = useLocation()
  return (
    <div className="card">
      <h2>Dashboard</h2>
      <p className="muted">Orders and settings for your account.</p>
      <div className="stack" style={{ marginBottom: 12 }}>
        <NavLink to="overview" className={setActive}>Overview</NavLink>
        <NavLink to="orders" className={setActive}>Orders</NavLink>
        <NavLink to="settings" className={setActive}>Settings</NavLink>
      </div>
      <Outlet key={loc.pathname} />
    </div>
  )
}
