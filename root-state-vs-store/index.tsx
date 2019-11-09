import React, { useState, useReducer } from 'react'
import ReactDOM from 'react-dom'
import { createStore, Dispatch } from 'redux'
import { useSelector, Provider, useDispatch } from 'react-redux'
import { Showcase } from './components/Showcase'
import { Layout } from './components/Layout'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Title } from './components/Title'
import { NotificationList } from './components/NotificationList'

const stub = [
  { id: 'x1', read: false, title: 'xxxxxxxxxxxxxx' },
  { id: 'x2', read: false, title: 'xxxxxxxxxxxxxx' },
  { id: 'x3', read: false, title: 'xxxxxxxxxxxxxx' },
]

function App() {
  return (
    <Layout
      header={<Header logoText="logo" notificationList={stub} />}
      footer={<Footer />}
    >
      <Title label="Notificaions" />
      <NotificationList value={stub} />
    </Layout>
  )
}

// #############################################################################
// bootstrap

ReactDOM.render(
  <Showcase>
    <App />
    <App />
  </Showcase>,
  document.getElementById('root'),
)
