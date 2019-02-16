import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Landing, Mirador} from './components'
import {newStore} from './state'
import './styles/index.scss'

const supportsHistory = 'pushState' in window.history
const t = Boolean(true)
const store = newStore(null)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter forceRefresh={!supportsHistory}>
      <Switch>
        <Route exact={t} path='/' component={Landing}/>
        <Route exact={t} path='/view/:uuid?' component={Mirador}/>
      </Switch>
    </BrowserRouter>
  </Provider>, document.getElementById('app'),
)
