import {localConfig} from '@mirador/configuration'
import {addWindow, fetchManifest, setConfig} from '@mirador/core'
import DiscoveryComponent from '@mirador/custom-components'
import {MiradorComponent} from '@mirador/react-components'
import React, {useEffect, useRef, useState} from 'react'
import {connect, ReactReduxContext} from 'react-redux'
import useReactRouter from 'use-react-router'
import {addWindows, fetchManifests, resolveAndMergeParams, withControlPanel} from '../api'
import i18n from '../api/i18n'

const replaceWorkspaceAdd = {
  component: DiscoveryComponent,
  modus: 'replace',
  target: 'WorkspaceAdd',
}

const MiradorWithPanel = withControlPanel(MiradorComponent)

const MiradorImplementation = (props) => {
  const initialConfiguration = useRef(localConfig)
  const i18nInstance = useRef(i18n)
  const [isInitialized, setIsInitialized] = useState(false)
  const { location } = useReactRouter()
  useEffect(() => {
    let mergedConfig = resolveAndMergeParams(location.search, localConfig)
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
        {({store}) => <MiradorWithPanel i18n={i18nInstance} store={store} plugins={[replaceWorkspaceAdd]}/>}
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

export const Mirador = connect(mapStateToProps, mapDispatchToProps)(MiradorImplementation)
