import {AnyAction, Dispatch, bindActionCreators} from 'redux'
import {PersistentDrawer, addWindows, fetchManifests, resolveAndMergeConfig} from '../api'
import React, {ReactElement, useEffect, useRef, useState} from 'react'
import {ReactReduxContext, connect} from 'react-redux'
import {evalAddWindows, fetchManifestWorker, setConfig} from '@mirador/core'
import {MetadataList} from '@mirador/custom-components'
import {MiradorComponent} from '@mirador/react-components'
import {localConfig} from '@mirador/configuration'
import {withRouter} from 'react-router-dom'


interface IMiradorImplementation {
  evalAddWindows: typeof evalAddWindows,
  config: {}
  dispatch: any
  fetchManifestWorker: Function,
  location: {
    search: {}
  },
  setConfig: Function,
  setWorkspaceFullscreen: any
  windows: {}
}

const plugins = [{
  component: MetadataList,
  mode: 'replace',
  target: 'LabelValueMetadata',
}]

const MiradorWithPanel = (props) => { return (<PersistentDrawer {...props} component={<MiradorComponent {...props}/>}/>) }


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
      fetchManifests(props.fetchManifestWorker, mergedConfig.windows)
      addWindows(mergedConfig, props.evalAddWindows)
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
      {({store}) =>
        <MiradorWithPanel plugins={plugins} store={store}/>
      }
    </ReactReduxContext.Consumer>) : null
}

/**
 *
 * @param state
 */
const mapStateToProps = (state): any => ({
  config: state.config,
  windows: state.windows
})


/**
 *
 */
const mapDispatchToProps = {evalAddWindows, fetchManifestWorker, setConfig}

export const Mirador = connect(mapStateToProps, mapDispatchToProps)(withRouter(MiradorImplementation))
