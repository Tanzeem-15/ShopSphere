import React from 'react'
import { Link } from 'react-router-dom'
export default function NotFound(){
  return (
    <div className="card">
      <h2>404 — Not Found</h2>
      <p className="muted">The page you requested does not exist.</p>
      <Link to="/">Go home →</Link>
    </div>
  )
}
