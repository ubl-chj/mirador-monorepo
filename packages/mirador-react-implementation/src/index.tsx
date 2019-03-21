import './styles/index.scss'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {CmsPage, Landing, Mirador} from './components'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core'
import {Provider} from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import {localConfig} from '@mirador/configuration'
import {newStore} from './state'
import { I18nextProvider } from 'react-i18next'
import i18n from '@mirador/i18n'

const supportsHistory = 'pushState' in window.history
const t = Boolean(true)
const store = newStore()
const defaultTheme = localConfig.theme
const theme = createMuiTheme(defaultTheme)

ReactDOM.render(
    <I18nextProvider i18n={i18n}>
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter forceRefresh={!supportsHistory}>
            <Switch>
              <Route component={Landing} exact={t} path='/'/>
              <Route component={Mirador} exact={t} path='/view/:uuid?'/>
              <Route component={CmsPage} exact={t} path='/cms'/>
            </Switch>
          </BrowserRouter>
        </Provider>
      </MuiThemeProvider>
    </I18nextProvider>, document.getElementById('app'),
)
