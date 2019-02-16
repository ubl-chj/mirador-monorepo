import deepmerge from 'deepmerge'
import qs from 'query-string'

/**
 * fetchManifests
 * @param config
 * @param fetch
 */
export function fetchManifests(config, fetch) {
  config.windows.forEach((win) => fetch(win.loadedManifest))
}

/**
 * getThumbnailNavigationPositions
 * @param config
 */
export function getThumbnailNavigationPositions(config) {
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
 * addWindows
 * @param config
 * @param addWindow
 */
export function addWindows(config, addWindow) {
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
 * resolveAndMergeParams
 * @param queryParams
 * @param config
 */
export function resolveAndMergeParams(queryParams, config) {
  const params = qs.parse(queryParams)
  if (Object.keys(params).length) {
    if (params.manifest) {
      const windowConfig = buildWindowConfig(params.manifest)
      return mergeConfigs(config, windowConfig)
    }
  }
}

/**
 * buildWindows
 * @param uri
 */
function buildWindowConfig(uri) {
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
function mergeConfigs(config, windows) {
  return deepmerge(config, windows)
}
