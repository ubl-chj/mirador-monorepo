import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import { Landing } from './components/Landing'
import {Mirador} from './components/Mirador'
import './styles/index.scss'
const supportsHistory = 'pushState' in window.history
const t = Boolean(true)

ReactDOM.render(
  <BrowserRouter forceRefresh={!supportsHistory}>
    <Switch>
      <Route exact={t} path='/' component={Landing}/>
      <Route exact={t} path='/view/:uuid?' component={Mirador}/>
    </Switch>
  </BrowserRouter>, document.getElementById('app'),
)
