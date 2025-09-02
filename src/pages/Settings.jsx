import React from 'react'
export default function Settings(){
  return (
    <form className="grid" style={{ maxWidth: 520 }} onSubmit={(e)=>{e.preventDefault(); alert('Saved!')}}>
      <label>
        <div>Name</div>
        <input className="input" defaultValue="demo" />
      </label>
      <button className="button" type="submit">Save Settings</button>
    </form>
  )
}
