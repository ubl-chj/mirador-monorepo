import {createMuiTheme, MuiThemeProvider} from "@material-ui/core"
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

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#37474f',
    },
    secondary: {
      contrastText: '#ffcc00',
      light: '#616161',
      main: '#0044ff',
    },
  },
  typography: {
    useNextVariants: true,
  },
})

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
