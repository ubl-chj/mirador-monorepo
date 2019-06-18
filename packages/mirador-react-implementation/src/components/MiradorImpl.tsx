import {PersistentDrawer, getThumbnailNavigationPositions, resolveAndMergeConfig} from '../api'
import React, {ReactElement, useEffect, useRef, useState} from 'react'
import {useDispatch} from 'react-redux'
import {evalAddWindows, fetchManifestWorker, getConfig, getIsWorkspaceEnabled, getWindows, setConfig} from '@mirador/core'
import {MiradorComponent} from '@mirador/react-components'
import {localConfig} from '@mirador/configuration'
import {withRouter} from 'react-router-dom'

interface IMiradorImplementation {
  config: {}
  dispatch: any
  enabled: boolean
  location: {
    search: {}
  },
  setConfig: Function,
  setWorkspaceFullscreen: any
  windows: {}
}

const MiradorWithPanel = (props) => { return (<PersistentDrawer {...props} component={<MiradorComponent {...props}/>}/>) }

const MiradorImplementation: React.FC<IMiradorImplementation> = (props): ReactElement => {
  const initialConfiguration = useRef(localConfig)
  const [isInitialized, setIsInitialized] = useState(false)
  const config = getConfig()
  const enabled = getIsWorkspaceEnabled()
  const windows = getWindows()
  const dispatch = useDispatch()

  const fetchManifests = (windows): any => {
    windows.forEach((win) => dispatch(fetchManifestWorker({manifestId: win.loadedManifest})))
  }

  const addWindows = (config): any => {
    const thumbnailPositions = getThumbnailNavigationPositions(config)
    thumbnailPositions.forEach((thumbnailNavigationPosition, index) => {
      dispatch(evalAddWindows({
        canvasIndex: (config.windows[index].canvasIndex || 0),
        manifestId: config.windows[index].loadedManifest,
        thumbnailNavigationPosition,
      }))
    })
  }

  /**
   * initializeWorkspace
   * @param mergedConfig
   * @returns boolean
   */
  const initializeWorkspace = (mergedConfig): boolean => {
    if (Object.keys(windows).length === 0) {
      fetchManifests(mergedConfig.windows)
      addWindows(mergedConfig)
    }
    return true
  }

  useEffect(() => {
    const {location} = props
    let mergedConfig = resolveAndMergeConfig(location.search, localConfig, config)
    if (mergedConfig && !isInitialized) {
      dispatch(setConfig(mergedConfig))
    } else if (!isInitialized) {
      mergedConfig = initialConfiguration.current
      dispatch(setConfig(mergedConfig))
    }
    if (mergedConfig && !isInitialized) {
      setIsInitialized(initializeWorkspace(mergedConfig))
    }
  }, [props, isInitialized])

  return isInitialized ? (
    <MiradorWithPanel enabled={enabled}/>) : null
}

export const Mirador = withRouter(MiradorImplementation)
