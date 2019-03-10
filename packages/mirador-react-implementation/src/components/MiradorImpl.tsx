import React, {ReactElement, useEffect, useRef, useState} from 'react'
import {ReactReduxContext, connect} from 'react-redux'
import {addWindow, fetchManifest, setConfig} from '@mirador/core'
import {addWindows, fetchManifests, resolveAndMergeConfig, withPersistentDrawer} from '../api'
import DiscoveryComponent from '@mirador/custom-components'
import {MiradorComponent} from '@mirador/react-components'
import {localConfig} from '@mirador/configuration'
import {styles} from '../styles'
import {withRouter} from 'react-router-dom'
import {withStyles} from '@material-ui/core'


const replaceWorkspaceAdd = {
  component: DiscoveryComponent,
  modus: 'replace',
  target: 'WorkspaceAdd',
}

const MiradorWithPanel = withStyles(styles, { withTheme: true })(withPersistentDrawer(MiradorComponent))

interface IMiradorImplementation {
  addWindow: Function,
  config: {}
  fetchManifest: Function,
  location: {
    search: {}
  },
  setConfig: Function,
  windows: {}
}

const MiradorImplementation: React.FC<IMiradorImplementation> = (props): ReactElement => {
  const initialConfiguration = useRef(localConfig)
  const [isInitialized, setIsInitialized] = useState(false)

  /**
   * initializeWorkspace
   * @param mergedConfig
   * @returns boolean
   */
  const initializeWorkspace = (mergedConfig): boolean => {
    if (Object.keys(props.windows).length === 0) {
      fetchManifests(mergedConfig.windows, props.fetchManifest)
      addWindows(mergedConfig, props.addWindow)
    }
    return true
  }

  useEffect(() => {
    let mergedConfig = resolveAndMergeConfig(props.location.search, localConfig, props.config)
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

  return isInitialized ? (
    <ReactReduxContext.Consumer>
      {({store}) => <MiradorWithPanel plugins={[replaceWorkspaceAdd]} store={store}/>}
    </ReactReduxContext.Consumer>) : null
}

/**
 *
 * @param config
 * @param windows
 */
const mapStateToProps = ({ config, windows }): any => ({
  config,
  windows,
})

/**
 *
 */
const mapDispatchToProps = {addWindow, fetchManifest, setConfig}

export const Mirador = connect(mapStateToProps, mapDispatchToProps)(withRouter(MiradorImplementation))
