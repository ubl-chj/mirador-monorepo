import deepmerge from 'deepmerge'
import qs from 'query-string'

/**
 * fetchManifests
 * @param windows
 * @param fetch
 */
export const fetchManifests = (windows, fetch) => {
  windows.forEach((win) => fetch(win.loadedManifest))
}

/**
 * getThumbnailNavigationPositions
 * @param config
 */
export const getThumbnailNavigationPositions = (config) => {
  const positions = []
  config.windows.forEach((val) => {
    if (val.thumbnailNavigationPosition) {
      positions.push(val.thumbnailNavigationPosition)
    } else {
      positions.push(config.thumbnailNavigation.defaultPosition)
    }
  })
  return positions
}

/**
 *
 * @param windows
 * @param removeWindow
 */
export const removeWindows = (windows, removeWindow) => {
  Object.keys(windows).forEach((key) => {
    removeWindow(key)
  })
}

/**
 * addWindows
 * @param config
 * @param addWindow
 */
export const addWindows = (config, addWindow) => {
  const thumbnailPositions = getThumbnailNavigationPositions(config)
  thumbnailPositions.forEach((thumbnailNavigationPosition, index) => {
    addWindow({
      canvasIndex: (config.windows[index].canvasIndex || 0),
      manifestId: config.windows[index].loadedManifest,
      thumbnailNavigationPosition,
    })
  })
}

/**
 * buildWindows
 * @param uri
 */
const buildWindowConfig = (uri) => {
  return {
    windows: [
      {
        loadedManifest: uri,
        thumbnailNavigationPosition: 'off',
      },
    ],
  }
}

/**
 * mergeConfigs
 * @param config
 * @param windows
 */
const mergeConfigs = (config, windows) => {
  return deepmerge(config, windows)
}

/**
 * resolveAndMergeParams
 * @param queryParams
 * @param config
 */
export const resolveAndMergeParams = (queryParams, config) => {
  const params = qs.parse(queryParams)
  if (Object.keys(params).length) {
    if (params.manifest) {
      const windowConfig = buildWindowConfig(params.manifest)
      return mergeConfigs(config, windowConfig)
    }
  }
}
