import React, { useState, useReducer } from 'react'
import ReactDOM from 'react-dom'
import { createStore, Dispatch } from 'redux'
import { useSelector, Provider, useDispatch } from 'react-redux'

// #############################################################################
// bootstrap

ReactDOM.render(<div>root-state-vs-store</div>, document.getElementById('root'))
