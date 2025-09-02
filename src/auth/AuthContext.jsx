import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const raw = localStorage.getItem('ss_user')
    if (raw) setUser(JSON.parse(raw))
  }, [])
  const login = (username) => {
    const next = { name: username || 'demo' }
    setUser(next); localStorage.setItem('ss_user', JSON.stringify(next))
  }
  const logout = () => { setUser(null); localStorage.removeItem('ss_user') }
  const value = useMemo(() => ({ user, login, logout }), [user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export function useAuth(){ return useContext(AuthContext) }
