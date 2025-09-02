import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Orders(){
  const { state } = useLocation()
  return (
    <div>
      {state?.success && (
        <div className="card" style={{ borderColor: 'var(--ok)' }}>
          <strong>Order placed successfully!</strong> Your ID is <code>{state.orderId}</code>.
        </div>
      )}
      <p>In a real app, this would list your past orders from an API.</p>
    </div>
  )
}
