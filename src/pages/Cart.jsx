import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../cart/CartContext.jsx'

export default function Cart(){
  const { items, updateQty, remove, clear, total } = useCart()
  const nav = useNavigate()

  if (!items.length) {
    return (
      <div className="card">
        <h2>Your Cart is Empty</h2>
        <Link to="/products">Browse products →</Link>
      </div>
    )
  }

  return (
    <div className="card">
      <h2>Cart</h2>
      {items.map(i => (
        <div key={i.id} className="stack" style={{ justifyContent: 'space-between', borderBottom: '1px solid var(--border)', padding: '8px 0' }}>
          <div className="stack">
            <strong>{i.name}</strong>
            <span className="muted">₹{i.price}</span>
          </div>
          <div className="stack">
            <input className="input" type="number" min="1" style={{width: 80}} value={i.qty}
              onChange={(e)=>updateQty(i.id, Math.max(1, Number(e.target.value)||1))}/>
            <button className="button danger" onClick={()=>remove(i.id)}>Remove</button>
          </div>
        </div>
      ))}
      <div className="stack" style={{ justifyContent: 'space-between', marginTop: 12 }}>
        <strong>Total: ₹{total}</strong>
        <div className="stack">
          <button className="button secondary" onClick={clear}>Clear Cart</button>
          <button className="button" onClick={()=>nav('/checkout')}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  )
}
