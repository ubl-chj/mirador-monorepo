import deepmerge from 'deepmerge'
import App, {addWindow, fetchManifest, setConfig} from 'mirador-component'
import qs from 'query-string'
import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {compose} from 'redux'
import {withInitialization} from '../api'
import {addWindows, fetchManifests} from '../api/initUtils'
const MiradorInit = withInitialization()(App)
const localConfig = require('../config/localAppConfig.json')

class MiradorComponent extends React.Component<any, any> {
  config: any

  constructor(props) {
    super(props)
    this.config = localConfig
  }

  setManifestFromParams(uri) {
    if (uri) {
      const initWindowFromParams = {
        windows: [
          {
            loadedManifest: uri,
            thumbnailNavigationPosition: 'off',
          },
        ],
      }
      this.props.setConfig(deepmerge(initWindowFromParams, this.config))
    }
  }

  componentDidMount() {
    this.resolveParams()
  }

  resolveParams() {
    const params = qs.parse(this.props.location.search)
    if (Object.keys(params).length) {
      if (params.manifest) {
        this.setManifestFromParams(params.manifest)
      }
    }
  }

  render() {
    if (Object.keys(this.props.config).length !== 0 && this.props.config.constructor === Object) {
      fetchManifests(this.props.config, this.props.fetchManifest)
      addWindows(this.props.config, this.props.addWindow)
      return <MiradorInit/>
    } else {
      this.props.setConfig(this.config)
      return null
    }
  }
}

/** mapStateToProps */
const mapStateToProps = ({ config }) => ({
  config,
})

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = {addWindow, fetchManifest, setConfig}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)

export const Mirador = enhance(MiradorComponent)
