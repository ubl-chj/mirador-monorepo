import { addWindow, fetchManifest, setConfig } from 'mirador-component'
import React from 'react'

/*
eslint max-len: ["error", { "ignoreComments": true }]
*/

/**
 * HoC that initializes a Mirador Application
 * @param store
 * @param config
 * @returns {function(*): {contextType?: React.Context<any>, new(props: Readonly<P>): HOC, new(props: P, context?: any): HOC, prototype: HOC}}
 */
export function withMiradorAPI(store, config) {
  // TODO validate config schema before processing / handle invalid or missing configuration
  // validateConfig(config)

  doInitialization()

  /**
   * doInitialization
   */
  function doInitialization() {
    dispatchSetConfig()
    fetchManifests()
    addWindows()
  }

  /**
   * dispatchSetConfig
   */
  async function dispatchSetConfig() {
    const action = setConfig(config)
    await store.dispatch(action)
  }

  /**
   * fetchManifests
   */
  function fetchManifests() {
    config.windows.forEach((win) => dispatchFetchManifest(win.loadedManifest))
  }

  /**
   * dispatchFetchManifest
   * @param uri
   */
  async function dispatchFetchManifest(uri) {
    await store.dispatch(fetchManifest(uri))
  }

  /**
   * addWindows
   */
  function addWindows() {
    const thumbnailPositions = getThumbnailNavigationPositions()
    thumbnailPositions.forEach((thumbnailNavigationPosition, index) => {
      dispatchAddWindow({
        canvasIndex: (config.windows[index].canvasIndex || 0),
        manifestId: config.windows[index].loadedManifest,
        thumbnailNavigationPosition,
      })
    })
  }

  /**
   * dispatchAddWindow
   * @param options
   */
  async function dispatchAddWindow(options) {
    await store.dispatch(addWindow(options))
  }

  /**
   * getThumbnailNavigationPositions
   */
  function getThumbnailNavigationPositions() {
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

  return function HOCFactory(WrappedComponent) {
    return class HOC extends React.Component {
      /**
       *
       * @returns {*}
       */
      render() {
        return <WrappedComponent {...this.props} />
      }
    }
  }
}
