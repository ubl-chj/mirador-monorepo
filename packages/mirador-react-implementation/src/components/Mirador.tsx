import {localConfig} from '@mirador/configuration'
import {addWindow, fetchManifest, MiradorComponent, setConfig} from '@mirador/react-component'
import React from 'react'
import {connect, ReactReduxContext} from 'react-redux'
import {withRouter} from 'react-router'
import {addWindows, fetchManifests, resolveAndMergeParams} from '../api'

class MiradorClass extends React.Component<any, any> {
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
    const windows = config.windows
    if (Object.keys(config).length !== 0 && config.constructor === Object) {
      fetchManifests(windows, this.props.fetchManifest)
      addWindows(config, this.props.addWindow)
      return (
        <ReactReduxContext.Consumer>
          {({ store }) => <MiradorComponent store={store}/>}
        </ReactReduxContext.Consumer>)
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

export const Mirador = connect(mapStateToProps, mapDispatchToProps)(withRouter(MiradorClass))
