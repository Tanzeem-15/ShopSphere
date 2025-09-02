import React, { Suspense, useMemo } from 'react'
import { Link, useLoaderData, useSearchParams, Await, defer } from 'react-router-dom'

export async function productsLoader(){
  await new Promise(r => setTimeout(r, 200)) // simulate latency
  const data = await import('../data/products.json')
  return defer({ products: data.default })
}

export default function Products(){
  const data = useLoaderData()
  const [params, setParams] = useSearchParams()
  const q = (params.get('q') || '').toLowerCase()
  const category = params.get('cat') || ''

  return (
    <div className="card">
      <div className="stack" style={{ justifyContent: 'space-between' }}>
        <h2>Products</h2>
        <div className="stack" style={{ width: '100%', maxWidth: 520 }}>
          <input className="input" placeholder="Search by name…" defaultValue={q}
            onChange={(e)=>{
              const next = new URLSearchParams(params)
              if (e.target.value) next.set('q', e.target.value); else next.delete('q')
              setParams(next)
            }}/>
          <select className="input" defaultValue={category} onChange={(e)=>{
            const next = new URLSearchParams(params)
            if (e.target.value) next.set('cat', e.target.value); else next.delete('cat')
            setParams(next)
          }}>
            <option value="">All categories</option>
            <option>Gadgets</option>
            <option>Wearables</option>
            <option>Audio</option>
            <option>Cameras</option>
            <option>Computers</option>
            <option>Accessories</option>
          </select>
        </div>
      </div>

      <Suspense fallback={<p className="muted">Loading products…</p>}>
        <Await resolve={data.products}>
          {(list) => <ProductList list={list} q={q} category={category}/>}
        </Await>
      </Suspense>
    </div>
  )
}

function ProductList({ list, q, category }){
  const filtered = useMemo(() => {
    return list.filter(p => {
      const byName = p.name.toLowerCase().includes(q)
      const byCat = !category || p.category === category
      return byName && byCat
    })
  }, [list, q, category])

  if (!filtered.length) return <p className="muted">No results.</p>

  return (
    <div className="grid" style={{ marginTop: 12 }}>
      {filtered.map(p => (
        <div key={p.id} className="card">
          <h3>{p.name}</h3>
          <p className="muted">{p.category}</p>
          <p className="price">₹{p.price}</p>
          <Link to={`/products/${p.id}`}>View details →</Link>
        </div>
      ))}
    </div>
  )
}
