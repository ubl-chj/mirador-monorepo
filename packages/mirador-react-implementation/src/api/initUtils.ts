import deepmerge from 'deepmerge'
import qs from 'query-string'

/**
 * fetchManifests
 * @param windows
 * @param fetch
 */
export const fetchManifests = (windows, fetch): any => {
  windows.forEach((win) => fetch(win.loadedManifest))
}

/**
 * getThumbnailNavigationPositions
 * @param config
 */
export const getThumbnailNavigationPositions = (config): any => {
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
export const removeWindows = (windows, removeWindow): any => {
  Object.keys(windows).forEach((key) => {
    removeWindow(key)
  })
}

/**
 *
 * @param config
 * @param evaluateWindows
 */
export const addWindows = (config, evaluateWindows): any => {
  const thumbnailPositions = getThumbnailNavigationPositions(config)
  thumbnailPositions.forEach((thumbnailNavigationPosition, index) => {
    evaluateWindows({
      canvasIndex: (config.windows[index].canvasIndex || 0),
      manifestId: config.windows[index].loadedManifest,
      thumbnailNavigationPosition,
    })
  })
}

const buildSettings = (currentConfig): any => {
  return Object.keys(currentConfig).length && {
    discovery: {
      currentIndex: currentConfig.discovery.currentIndex
    },
    language: currentConfig.language,
    workspace: {
      type: currentConfig.workspace.type
    }
  }
}

/**
 * buildWindows
 * @param uri
 */
const buildWindowConfig = (uri): any => {
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
 *
 * @param localConfig
 * @param settings
 * @param windows
 */
const mergeConfigs = (localConfig, settings, windows): any => {
  return deepmerge.all([localConfig, settings, windows])
}

/**
 *
 * @param queryParams
 * @param localConfig
 * @param currentConfig
 */
export const resolveAndMergeConfig = (queryParams, localConfig, currentConfig): any => {
  const settings = buildSettings(currentConfig)
  const params = qs.parse(queryParams)
  if (Object.keys(params).length) {
    if (params.manifest) {
      const windowConfig = buildWindowConfig(params.manifest)
      return mergeConfigs(localConfig, settings, windowConfig)
    }
  } else {
    return mergeConfigs(localConfig, settings, {})
  }
}
