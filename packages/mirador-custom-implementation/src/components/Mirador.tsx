import deepmerge from 'deepmerge'
import App from 'mirador-component'
import qs from 'query-string'
import React from 'react'
import {Provider} from 'react-redux'
import {withRouter} from 'react-router'
import {withMiradorAPI} from '../api'
import {newStore} from '../state'

const store = newStore(null)

class MiradorComponent extends React.Component<any, any> {
  static initMirador(config) {
    return (withMiradorAPI(store, config)(App))
  }
  constructor(props) {
    super(props)
    this.state = {
      config: require('../config/localAppConfig.json'),
    }
  }

  setManifestFromParams(uri) {
    const {config} = this.state
    if (uri) {
      const initWindowFromParams = {
        windows: [
          {
            loadedManifest: uri,
            thumbnailNavigationPosition: 'off',
          },
        ],
      }
      const newConfig = deepmerge(initWindowFromParams, config)
      this.setState({config: newConfig})
    }
  }

  componentDidMount() {
    this.resolveParams()
  }

  resolveParams() {
    const {config} = this.state
    const params = qs.parse(this.props.location.search)
    if (Object.keys(params).length) {
      if (params.manifest) {
        this.setManifestFromParams(params.manifest)
      }
    } else {
      this.setState(config)
    }
  }

  render() {
    const {config} = this.state
    const MiradorInit = MiradorComponent.initMirador(config)
    return (
      <Provider store={store}>
        <MiradorInit/>
      </Provider>
    )
  }
}

export const Mirador = withRouter(MiradorComponent)
