import React from 'react'
import { Link, useMatches } from 'react-router-dom'

export default function Breadcrumbs(){
  const matches = useMatches()
  const crumbs = matches.filter(m => m.handle?.breadcrumb).map((m, i) => {
    const label = typeof m.handle.breadcrumb === 'function' ? m.handle.breadcrumb(m) : m.handle.breadcrumb
    const isLast = i === matches.length - 1
    return (
      <span key={m.id}>
        {!isLast ? <Link to={m.pathname}>{label}</Link> : <span>{label}</span>}
        {!isLast && ' / '}
      </span>
    )
  })
  return crumbs.length ? <div className="breadcrumbs">{crumbs}</div> : null
}
