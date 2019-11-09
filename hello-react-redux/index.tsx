import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { createStore, Dispatch } from 'redux'
import { useSelector, Provider, useDispatch } from 'react-redux'

type State = {
  name: string
  nameList: string[]
}

type Action =
  | {
      type: 'SET_NAME'
      payload: string
    }
  | {
      type: 'ADD_NAME_IN_LIST'
    }
  | {
      type: 'SET_NAME_IN_LIST'
      payload: {
        value: string
        index: number
      }
    }

function reducer(
  state: State | undefined = {
    name: '',
    nameList: [''],
  },
  action: Action,
): State {
  switch (action.type) {
    case 'SET_NAME': {
      return {
        ...state,
        name: action.payload,
      }
    }

    case 'ADD_NAME_IN_LIST': {
      const { nameList } = state

      const newNameList = [...nameList]
      newNameList.push('')

      return {
        ...state,
        nameList: newNameList,
      }
    }

    case 'SET_NAME_IN_LIST': {
      const { value, index } = action.payload
      const { nameList } = state

      const newNameList = [...nameList]
      newNameList[index] = value

      return {
        ...state,
        nameList: newNameList,
      }
    }

    default: {
      const _: never = action
      return state
    }
  }
}

function AppStatic() {
  return (
    <div>
      <h1>Hello world!</h1>
    </div>
  )
}

function AppStaticState() {
  const name = useSelector((state: State) => state.name)

  return (
    <div>
      <h1>Hello {name}!</h1>
      <input value={name} />
    </div>
  )
}

function AppInputSimple() {
  const name = useSelector((state: State) => state.name)

  const dispatch = useDispatch<Dispatch<Action>>()
  const setName = (name: string) => {
    dispatch({
      type: 'SET_NAME',
      payload: name,
    })
  }

  return (
    <div>
      <h1>Hello {name}!</h1>
      <input value={name} onChange={e => setName(e.target.value)} />
    </div>
  )
}

function AppInput() {
  const name = useSelector((state: State) => state.name)

  const dispatch = useDispatch<Dispatch<Action>>()
  const setName = (name: string) => {
    dispatch({
      type: 'SET_NAME',
      payload: name,
    })
  }

  return (
    <div>
      <h1>Hello {name.toUpperCase() || 'world'}!</h1>
      <input value={name} onChange={e => setName(e.target.value)} />
    </div>
  )
}

function AppCheckbox() {
  const name = useSelector((state: State) => state.name)

  const dispatch = useDispatch<Dispatch<Action>>()
  const setName = (name: string) => {
    dispatch({
      type: 'SET_NAME',
      payload: name,
    })
  }

  const [checked, setChecked] = useState(false)

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

function AppInputArrayStatic() {
  const nameList = useSelector((state: State) => state.nameList)

  const dispatch = useDispatch<Dispatch<Action>>()
  const add = () => {
    dispatch({
      type: 'ADD_NAME_IN_LIST',
    })
  }

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

function AppInputArray() {
  const nameList = useSelector((state: State) => state.nameList)

  const dispatch = useDispatch<Dispatch<Action>>()
  const add = () => {
    dispatch({
      type: 'ADD_NAME_IN_LIST',
    })
  }
  const setNameAtIndex = (name: string, index: number) => {
    dispatch({
      type: 'SET_NAME_IN_LIST',
      payload: {
        value: name,
        index,
      },
    })
  }

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
          onChange={e => setNameAtIndex(e.target.value, i)}
        />
      ))}
    </div>
  )
}

const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
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
  </Provider>,
  document.getElementById('root'),
)
