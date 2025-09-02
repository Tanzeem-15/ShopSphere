import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../cart/CartContext.jsx'

export default function Checkout(){
  const { items, total, clear } = useCart()
  const nav = useNavigate()

  function placeOrder(e){
    e.preventDefault()
    // In a real app, send to API. Here we mock an order id and clear cart.
    const orderId = 'ORD-' + Math.random().toString(36).slice(2,8).toUpperCase()
    clear()
    nav('/dashboard/orders', { state: { success: true, orderId } })
  }

  if (!items.length) {
    return <p className="muted">Nothing to checkout — your cart is empty.</p>
  }

  return (
    <div className="card" style={{ maxWidth: 640 }}>
      <h2>Checkout</h2>
      <p className="muted">Total to pay: ₹{total}</p>
      <form className="grid" onSubmit={placeOrder}>
        <label>
          <div>Full Name</div>
          <input className="input" required placeholder="Tanzeem" />
        </label>
        <label>
          <div>Address</div>
          <input className="input" required placeholder="Street, City, ZIP" />
        </label>
        <label>
          <div>Payment</div>
          <input className="input" required placeholder="Card **** **** **** 4242" />
        </label>
        <button className="button" type="submit">Place Order</button>
      </form>
    </div>
  )
}
