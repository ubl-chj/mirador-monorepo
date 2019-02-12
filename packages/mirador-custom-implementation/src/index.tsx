import App from 'mirador-react-component'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { withMiradorAPI } from './api'
import { newStore } from './state'
import './styles/index.scss'

const store = newStore(null)

const config = require('./config/localAppConfig.json')

const Mirador = withMiradorAPI(store, config)(App)

ReactDOM.render(
  <Provider store={store}>
    <Mirador />
  </Provider>, document.getElementById('app'),
)
