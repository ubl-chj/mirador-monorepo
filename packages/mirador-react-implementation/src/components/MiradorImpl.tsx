import {localConfig} from '@mirador/configuration'
import {addWindow, fetchManifest, MiradorComponent, setConfig} from '@mirador/react-component'
import React, {useEffect, useRef, useState} from 'react'
import {connect, ReactReduxContext} from 'react-redux'
import {withRouter} from 'react-router'
import {addWindows, fetchManifests, resolveAndMergeParams, withControlPanel} from '../api'

const MiradorWithPanel = withControlPanel(MiradorComponent)
const MiradorImplementation = (props) => {
  const initialConfiguration = useRef(localConfig)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    let mergedConfig = resolveAndMergeParams(props.location.search, localConfig)
    if (mergedConfig && !isInitialized) {
      props.setConfig(mergedConfig)
    } else if (!isInitialized) {
      mergedConfig = initialConfiguration.current
      props.setConfig(mergedConfig)
    }
    if (mergedConfig && !isInitialized) {
      setIsInitialized(initializeWorkspace(mergedConfig))
    }
  }, [props, isInitialized])

  /**
   * initializeWorkspace
   * @param mergedConfig
   * @returns boolean
   */
  const initializeWorkspace = (mergedConfig) => {
    if (Object.keys(props.windows).length === 0) {
      fetchManifests(mergedConfig.windows, props.fetchManifest)
      addWindows(mergedConfig, props.addWindow)
    }
    return true
  }

  if (isInitialized) {
    return (
      <ReactReduxContext.Consumer>
        {({store}) => <MiradorWithPanel store={store}/>}
      </ReactReduxContext.Consumer>)
  } else {
    return null
  }
}

/** mapStateToProps */
const mapStateToProps = ({ config, windows }) => ({
  config,
  windows,
})

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = {addWindow, fetchManifest, setConfig}

export const Mirador = connect(mapStateToProps, mapDispatchToProps)(withRouter(MiradorImplementation))
