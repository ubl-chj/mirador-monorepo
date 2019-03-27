import {SET_WORKSPACE_ADD_VISIBILITY, SET_WORKSPACE_FULLSCREEN, SET_WORKSPACE_VIEWPORT_POSITION,
  TOGGLE_WORKSPACE_EXPOSE_MODE, TOGGLE_ZOOM_CONTROLS, UPDATE_WORKSPACE_MOSAIC_LAYOUT} from './action-types'
import { createAction } from 'typesafe-actions'

/**
 * setWorkspaceFullscreen - action creator
 *
 * @param  {Boolean} isFullscreenEnabled
 * @memberof ActionCreators
 */
export const setWorkspaceFullscreen = createAction(SET_WORKSPACE_FULLSCREEN, action => {
  return (isFullscreenEnabled: boolean) => action({isFullscreenEnabled})
})

/**
 * toggleZoomControls - action creator
 * @param {Boolean} showZoomControls
 * @memberof ActionCreators
*/
export const toggleZoomControls = createAction(TOGGLE_ZOOM_CONTROLS, action => {
  return (showZoomControls: boolean) => action({showZoomControls});
})

/**
 * updateWorkspaceMosaicLayout - action creator
 *
 * @param  {Object} layout
 * @memberof ActionCreators
 */
export const updateWorkspaceMosaicLayout = createAction(UPDATE_WORKSPACE_MOSAIC_LAYOUT, action => {
  return (layout: {}) => action({layout});
})

/**
 * updateWorkspaceMosaicLayout - action creator
 *
 * @param  {Object} isWorkspaceAddVisible
 * @memberof ActionCreators
 */
export const setWorkspaceAddVisibility = createAction(SET_WORKSPACE_ADD_VISIBILITY, action => {
  return (isWorkspaceAddVisible: boolean) => action({isWorkspaceAddVisible})
})

/**
 * setWorkspaceViewportPosition - action creator
 *
 * @param  {Object} position
 * @memberof ActionCreators
 */
export const setWorkspaceViewportPosition = createAction(SET_WORKSPACE_VIEWPORT_POSITION, action => {
  return (x, y) => action({
    position: {
      x,
      y,
    },
  })
})

/**
 * setWorkspaceViewportDimensions - action creator
 *
 * @param  {Object} position
 * @memberof ActionCreators
 */
export const setWorkspaceViewportDimensions = createAction(SET_WORKSPACE_VIEWPORT_POSITION, action => {
  return (width, height) => action({
    position: {
      height,
      width,
    },
  })
})
/**
 * toggleWorkspaceExposeMode - action creator
 *
 * @memberof ActionCreators
 */
export const toggleWorkspaceExposeMode = createAction(TOGGLE_WORKSPACE_EXPOSE_MODE, action => {
  return (exposeModeOn: boolean) => action({exposeModeOn})
})

