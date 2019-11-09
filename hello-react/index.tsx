import React, { useState } from 'react'
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
  </div>,
  document.getElementById('root'),
)
