import {createMuiTheme, MuiThemeProvider} from '@material-ui/core'
import {localConfig} from '@mirador/configuration'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {CmsPage, Landing, Mirador} from './components'
import {newStore} from './state'
import './styles/index.scss'

const supportsHistory = 'pushState' in window.history
const t = Boolean(true)
const store = newStore(null)
const defaultTheme = localConfig.theme
const theme = createMuiTheme(defaultTheme)

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter forceRefresh={!supportsHistory}>
          <Switch>
            <Route exact={t} path='/' component={Landing}/>
            <Route exact={t} path='/view/:uuid?' component={Mirador}/>
            <Route exact={t} path='/cms' component={CmsPage}/>
          </Switch>
        </BrowserRouter>
      </Provider>
    </MuiThemeProvider>, document.getElementById('app'),
)
