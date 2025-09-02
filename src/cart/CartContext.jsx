import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
export function CartProvider({ children }) {
  const [items, setItems] = useState([]) // {id, name, price, qty}
  useEffect(() => {
    const raw = localStorage.getItem('ss_cart')
    if (raw) setItems(JSON.parse(raw))
  }, [])
  useEffect(() => { localStorage.setItem('ss_cart', JSON.stringify(items)) }, [items])

  const add = (product, qty=1) => {
    setItems(prev => {
      const i = prev.findIndex(p => p.id === product.id)
      if (i >= 0) {
        const next = [...prev]; next[i] = { ...next[i], qty: next[i].qty + qty }; return next
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty }]
    })
  }
  const remove = (id) => setItems(prev => prev.filter(p => p.id !== id))
  const updateQty = (id, qty) => setItems(prev => prev.map(p => p.id === id ? { ...p, qty } : p))
  const clear = () => setItems([])
  const total = items.reduce((s, p) => s + p.price * p.qty, 0)

  const value = useMemo(() => ({ items, add, remove, updateQty, clear, total }), [items, total])
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
export function useCart(){ return useContext(CartContext) }
