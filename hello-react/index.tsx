import React, { useState } from 'react'
import ReactDOM from 'react-dom'

function App() {
  const [name, setName] = useState('')

  return (
    <div>
      <h1>Hello {name.toUpperCase() || 'world'}!</h1>
      <input value={name} onChange={e => setName(e.target.value)} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
