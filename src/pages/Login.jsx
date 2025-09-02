import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'

export default function Login(){
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'

  function onSubmit(e){
    e.preventDefault()
    const name = new FormData(e.currentTarget).get('username')
    login(name || 'demo'); navigate(from, { replace: true })
  }

  return (
    <div className="card" style={{ maxWidth: 460 }}>
      <h2>Login</h2>
      <p className="muted">Use any username to sign in.</p>
      <form className="grid" onSubmit={onSubmit}>
        <label>
          <div>Username</div>
          <input className="input" name="username" placeholder="tanzeem" />
        </label>
        <button className="button" type="submit">Sign In</button>
      </form>
    </div>
  )
}
