import './styles/index.scss'
import '@mirador/i18n'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {CmsPage, Landing, Mirador} from './components'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import {Provider} from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import {newStore} from './state'

const supportsHistory = 'pushState' in window.history
const t = Boolean(true)
const store = newStore()
const apollo = process.env.REACT_APP_APOLLO_HOST
const cache = new InMemoryCache()
const client = new ApolloClient({
  cache,
  uri: apollo,
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter forceRefresh={!supportsHistory}>
        <Switch>
          <Route component={Landing} exact={t} path='/'/>
          <Route component={Mirador} exact={t} path='/view/:uuid?'/>
          <Route component={CmsPage} exact={t} path='/cms'/>
        </Switch>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>, document.getElementById('app'),
)
