import './styles/index.scss'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {CmsPage, Landing, Mirador} from './components'
import { I18nextProvider } from 'react-i18next'
import {Provider} from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import i18n from '@mirador/i18n'
import {newStore} from './state'

const supportsHistory = 'pushState' in window.history
const t = Boolean(true)
const store = newStore()


ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <BrowserRouter forceRefresh={!supportsHistory}>
        <Switch>
          <Route component={Landing} exact={t} path='/'/>
          <Route component={Mirador} exact={t} path='/view/:uuid?'/>
          <Route component={CmsPage} exact={t} path='/cms'/>
        </Switch>
      </BrowserRouter>
    </Provider>
  </I18nextProvider>, document.getElementById('app'),
)
