import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

// #############################################################################
//

function AppStatic() {
  return (
    <div>
      <h1>Hello world!</h1>
    </div>
  )
}

// #############################################################################
//

function AppStaticState() {
  const [name, setName] = useState('')

  return (
    <div>
      <h1>Hello {name}!</h1>
      <input value={name} />
    </div>
  )
}

// #############################################################################
//

function AppInputSimple() {
  const [name, setName] = useState('')

  return (
    <div>
      <h1>Hello {name}!</h1>
      <input value={name} onChange={e => setName(e.target.value)} />
    </div>
  )
}

// #############################################################################
//

function AppInput() {
  const [name, setName] = useState('')

  return (
    <div>
      <h1>Hello {name.toUpperCase() || 'world'}!</h1>
      <input value={name} onChange={e => setName(e.target.value)} />
    </div>
  )
}

// #############################################################################
//

function AppCheckbox() {
  const [checked, setChecked] = useState(false)
  const [name, setName] = useState('')

  return (
    <div>
      <h1>Hello {name.toUpperCase() || 'world'}!</h1>
      <input
        type="checkbox"
        checked={checked}
        onChange={e => setChecked(e.target.checked)}
      />

      {checked && (
        <input value={name} onChange={e => setName(e.target.value)} />
      )}
    </div>
  )
}

// #############################################################################
//

function AppInputArrayStatic() {
  const [nameList, setNameList] = useState([''])
  const add = () => setNameList(list => [...list, ''])

  return (
    <div>
      <h1>Hello {nameList.join(' and ')}!</h1>
      <button type="button" onClick={add}>
        Add
      </button>

      {nameList.map((name, i) => (
        <input key={i} value={name} />
      ))}
    </div>
  )
}

// #############################################################################
//

function AppInputArray() {
  const [nameList, setNameList] = useState([''])
  const add = () => setNameList(list => [...list, ''])

  return (
    <div>
      <h1>Hello {nameList.join(' and ')}!</h1>
      <button type="button" onClick={add}>
        Add
      </button>

      {nameList.map((name, i) => (
        <input
          key={i}
          value={name}
          onChange={e => {
            const newName = e.target.value

            setNameList(list => {
              const newNameList = [...list]
              newNameList[i] = newName

              return newNameList
            })
          }}
        />
      ))}
    </div>
  )
}

// #############################################################################
//

function AppAsync() {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)

  const callAPI = async () => {
    setLoading(true)

    const id = Math.floor(10 * Math.random() + 1)
    const data = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
    ).then(r => r.json())

    setValue(data.name)
    setLoading(false)
  }

  return (
    <div>
      <h1>Hello {loading ? 'loading...' : value}</h1>
      <button type="button" onClick={callAPI}>
        Call API
      </button>
    </div>
  )
}

// #############################################################################
//

function AppTimer() {
  const [count, setCount] = useState(0)
  const increment = () => setCount(v => v + 1)

  useEffect(() => {
    const timer = setInterval(increment, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div>
      <h1>Timer {count}</h1>
    </div>
  )
}

// #############################################################################
// bootstrap

ReactDOM.render(
  <div>
    <AppStatic />
    <hr />
    <AppStaticState />
    <hr />
    <AppInputSimple />
    <hr />
    <AppInput />
    <hr />
    <AppCheckbox />
    <hr />
    <AppInputArrayStatic />
    <hr />
    <AppInputArray />
    <hr />
    <AppAsync />
    <hr />
    <AppTimer />
  </div>,
  document.getElementById('root'),
)
