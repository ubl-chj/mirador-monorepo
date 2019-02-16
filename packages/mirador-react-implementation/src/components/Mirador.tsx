import App, {addWindow, fetchManifest, setConfig} from '@mirador/react-component'
import {localConfig} from '@mirador/configuration'
import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {addWindows, fetchManifests, resolveAndMergeParams, withInitialization} from '../api'
const MiradorInit = withInitialization()(App)

class MiradorComponent extends React.Component<any, any> {
  config: any

  constructor(props) {
    super(props)
    this.config = localConfig
  }

  componentDidMount() {
    const mergedConfig = resolveAndMergeParams(this.props.location.search, this.config)
    if (mergedConfig) {
      this.props.setConfig(mergedConfig)
    }
  }

  render() {
    const {config} = this.props
    if (Object.keys(config).length !== 0 && config.constructor === Object) {
      fetchManifests(config, this.props.fetchManifest)
      addWindows(config, this.props.addWindow)
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

export const Mirador = connect(mapStateToProps, mapDispatchToProps)(withRouter(MiradorComponent))
