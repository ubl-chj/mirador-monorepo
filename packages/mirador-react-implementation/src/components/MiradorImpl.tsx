import {withStyles} from '@material-ui/core'
import {localConfig} from '@mirador/configuration'
import {addWindow, fetchManifest, setConfig} from '@mirador/core'
import DiscoveryComponent from '@mirador/custom-components'
import {MiradorComponent} from '@mirador/react-components'
import React, {useEffect, useRef, useState} from 'react'
import {connect, ReactReduxContext} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {addWindows, fetchManifests, resolveAndMergeParams, withPersistentDrawer} from '../api'
import {styles} from '../styles'

const replaceWorkspaceAdd = {
  component: DiscoveryComponent,
  modus: 'replace',
  target: 'WorkspaceAdd',
}

const MiradorWithPanel = withStyles(styles, { withTheme: true })(withPersistentDrawer(MiradorComponent))

interface IMiradorImplementation {
  addWindow: Function,
  fetchManifest: Function,
  location: {
    search: {}
  },
  setConfig: Function,
  windows: {}
}

const MiradorImplementation : React.FC<IMiradorImplementation> = (props) => {
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
        {({store}) => <MiradorWithPanel store={store} plugins={[replaceWorkspaceAdd]}/>}
      </ReactReduxContext.Consumer>)
  } else {
    return null
  }
}

/**
 *
 * @param config
 * @param windows
 */
const mapStateToProps = ({ config, windows }) => ({
  config,
  windows,
})

/**
 *
 */
const mapDispatchToProps = {addWindow, fetchManifest, setConfig}

export const Mirador = connect(mapStateToProps, mapDispatchToProps)(withRouter(MiradorImplementation))
