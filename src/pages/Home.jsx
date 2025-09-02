import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div className="grid">
      <div className="card">
        <h2>Modern E‑commerce UX</h2>
        <p className="muted">Filters, detail pages, cart, and a protected checkout flow.</p>
        <Link to="/products">Browse products →</Link>
      </div>
      <div className="card">
        <h2>React Router v6</h2>
        <p className="muted">Nested routes, loaders, dynamic params, breadcrumbs, and lazy loading.</p>
        <Link to="/products/p1">Open Quantum Phone →</Link>
      </div>
      <div className="card">
        <h2>Portfolio‑ready</h2>
        <p className="muted">Writeups, clean UI, and deployable on GitHub Pages or Vercel.</p>
        <Link to="/about">About this project →</Link>
      </div>
    </div>
  )
}
