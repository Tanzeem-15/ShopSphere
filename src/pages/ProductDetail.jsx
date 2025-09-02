import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { useCart } from '../cart/CartContext.jsx'

export async function productDetailLoader({ params }){
  const data = await import('../data/products.json')
  const item = data.default.find(p => p.id === params.id)
  if (!item) throw new Response('Not Found', { status: 404 })
  return item
}

export default function ProductDetail(){
  const item = useLoaderData()
  const { add } = useCart()
  return (
    <div className="card">
      <h2>{item.name}</h2>
      <p className="muted">Category: {item.category}</p>
      <p className="price">Price: ₹{item.price}</p>
      <div className="stack">
        <button className="button" onClick={()=>add(item, 1)}>Add to Cart</button>
      </div>
      <p style={{marginTop:12}}>This page uses a <strong>route loader</strong> and a dynamic <code>:id</code> param. Try changing the URL.</p>
    </div>
  )
}
