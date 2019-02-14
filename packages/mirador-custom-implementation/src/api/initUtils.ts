/**
 *
 * @param config
 * @param fetch
 */
export function fetchManifests(config, fetch) {
  config.windows.forEach((win) => fetch(win.loadedManifest))
}

/**
 * getThumbnailNavigationPositions
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
