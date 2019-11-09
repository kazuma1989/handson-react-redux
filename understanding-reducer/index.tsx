import React, { useState, useReducer } from 'react'
import ReactDOM from 'react-dom'
import { createStore, Dispatch } from 'redux'
import { useSelector, Provider, useDispatch } from 'react-redux'

// #############################################################################
// State

type State = {
  count: number
}

// #############################################################################
// useState

function AppUseState() {
  const [state, setState] = useState<State>({ count: 0 })

  const increment = () => {
    setState(prevState => ({
      ...prevState,
      count: prevState.count + 1,
    }))
  }
  const decrement = () => {
    setState(prevState => ({
      ...prevState,
      count: prevState.count - 1,
    }))
  }

  return (
    <div>
      {state.count}
      <button type="button" onClick={increment}>
        +
      </button>
      <button type="button" onClick={decrement}>
        -
      </button>
    </div>
  )
}

// #############################################################################
// wrap useState

function useMyStateHook() {
  const [state, setState] = useState<State>({ count: 0 })

  const increment = () => {
    setState(prevState => ({
      ...prevState,
      count: prevState.count + 1,
    }))
  }
  const decrement = () => {
    setState(prevState => ({
      ...prevState,
      count: prevState.count - 1,
    }))
  }

  return {
    state,
    increment,
    decrement,
  }
}

function AppUseStateWithMyHooks() {
  const { state, increment, decrement } = useMyStateHook()

  return (
    <div>
      {state.count}
      <button type="button" onClick={increment}>
        +
      </button>
      <button type="button" onClick={decrement}>
        -
      </button>
    </div>
  )
}

// #############################################################################
// useState and reducer

type Action =
  | {
      type: 'INCREMENT'
    }
  | {
      type: 'DECREMENT'
    }

function reducer(
  state: State | undefined = { count: 0 },
  action: Action,
): State {
  switch (action.type) {
    case 'INCREMENT': {
      return {
        ...state,
        count: state.count + 1,
      }
    }

    case 'DECREMENT': {
      return {
        ...state,
        count: state.count - 1,
      }
    }

    default: {
      const _: never = action
      return state
    }
  }
}

const initialState = reducer(undefined, {} as any)

function AppUseStateWithReducer() {
  const [state, setState] = useState(initialState)
  const dispatch = (action: Action) =>
    setState(prevState => reducer(prevState, action))

  const increment = () => {
    dispatch({
      type: 'INCREMENT',
    })
  }
  const decrement = () => {
    dispatch({
      type: 'DECREMENT',
    })
  }

  return (
    <div>
      {state.count}
      <button type="button" onClick={increment}>
        +
      </button>
      <button type="button" onClick={decrement}>
        -
      </button>
    </div>
  )
}

// #############################################################################
// wrap useState and reducer

function useMyReducer(
  reducer: (state: State, action: Action) => State,
  initialState: State,
) {
  const [state, setState] = useState(initialState)
  const dispatch = (action: Action) =>
    setState(prevState => reducer(prevState, action))

  return [state, dispatch] as const
}

function AppUseMyReducer() {
  const [state, dispatch] = useMyReducer(reducer, initialState)

  const increment = () => {
    dispatch({
      type: 'INCREMENT',
    })
  }
  const decrement = () => {
    dispatch({
      type: 'DECREMENT',
    })
  }

  return (
    <div>
      {state.count}
      <button type="button" onClick={increment}>
        +
      </button>
      <button type="button" onClick={decrement}>
        -
      </button>
    </div>
  )
}

// #############################################################################
// useReducer

function AppUseReducer() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const increment = () => {
    dispatch({
      type: 'INCREMENT',
    })
  }
  const decrement = () => {
    dispatch({
      type: 'DECREMENT',
    })
  }

  return (
    <div>
      {state.count}
      <button type="button" onClick={increment}>
        +
      </button>
      <button type="button" onClick={decrement}>
        -
      </button>
    </div>
  )
}

// #############################################################################
// with Redux

function AppWithRedux() {
  const count = useSelector((state: State) => state.count)
  const dispatch = useDispatch<Dispatch<Action>>()

  const increment = () => {
    dispatch({
      type: 'INCREMENT',
    })
  }
  const decrement = () => {
    dispatch({
      type: 'DECREMENT',
    })
  }

  return (
    <div>
      {count}
      <button type="button" onClick={increment}>
        +
      </button>
      <button type="button" onClick={decrement}>
        -
      </button>
    </div>
  )
}

// #############################################################################
// bootstrap

const store = createStore(reducer)

ReactDOM.render(
  <div>
    <AppUseState />
    <hr />
    <AppUseStateWithMyHooks />
    <hr />
    <AppUseStateWithReducer />
    <hr />
    <AppUseMyReducer />
    <hr />
    <AppUseReducer />
    <hr />
    <Provider store={store}>
      <AppWithRedux />
    </Provider>
  </div>,
  document.getElementById('root'),
)
