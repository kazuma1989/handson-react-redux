import React, { useState, useReducer } from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { createStore, Dispatch } from 'redux'
import { useSelector, Provider, useDispatch } from 'react-redux'
import { Showcase } from './components/Showcase'
import { Layout } from './components/Layout'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Title } from './components/Title'
import { NotificationList } from './components/NotificationList'
import { Profile } from './components/Profile'

const stub = [
  { id: 'x1', read: false, title: 'xxxxxxxxxxxxxx' },
  { id: 'x2', read: false, title: 'xxxxxxxxxxxxxx' },
  { id: 'x3', read: false, title: 'xxxxxxxxxxxxxx' },
]
const stubProfile = {
  id: '',
  name: 'John Smith',
  sns: '@jsmith',
  position: 'Development manager',
}

function App() {
  return (
    <Layout
      header={<Header logoText="logo" notificationList={stub} />}
      footer={<Footer />}
    >
      <Switch>
        <Route exact path="/">
          <Title label="Profile" />
          <Profile value={stubProfile} />
        </Route>

        <Route exact path="/notifications/">
          <Title label="Notificatinos" />
          <NotificationList value={stub} />
        </Route>

        <Route>
          <Title label="Not Found" />
        </Route>
      </Switch>
    </Layout>
  )
}

// #############################################################################
// bootstrap

ReactDOM.render(
  <BrowserRouter>
    <Showcase>
      <App />
      <App />
    </Showcase>
  </BrowserRouter>,
  document.getElementById('root'),
)
