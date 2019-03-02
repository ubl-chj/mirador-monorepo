import {ActionTypes} from './action-types'

/**
 * setWorkspaceFullscreen - action creator
 *
 * @param  {Boolean} isFullscreenEnabled
 * @memberof ActionCreators
 */
export function setWorkspaceFullscreen(isFullscreenEnabled) {
  return { type: ActionTypes.SET_WORKSPACE_FULLSCREEN, isFullscreenEnabled }
}

/**
 * toggleZoomControls
 * @param showZoomControls
 */
export function toggleZoomControls(showZoomControls) {
  return { type: ActionTypes.TOGGLE_ZOOM_CONTROLS, showZoomControls }
}

/**
 * updateWorkspaceMosaicLayout - action creator
 *
 * @param  {Object} layout
 * @memberof ActionCreators
 */
export function updateWorkspaceMosaicLayout(layout) {
  return { type: ActionTypes.UPDATE_WORKSPACE_MOSAIC_LAYOUT, layout }
}

/**
 * updateWorkspaceMosaicLayout - action creator
 *
 * @param  {Object} isWorkspaceAddVisible
 * @memberof ActionCreators
 */
export function setWorkspaceAddVisibility(isWorkspaceAddVisible) {
  return { type: ActionTypes.SET_WORKSPACE_ADD_VISIBILITY, isWorkspaceAddVisible }
}

/**
 * setWorkspaceViewportPosition - action creator
 *
 * @param  {Object} position
 * @memberof ActionCreators
 */
export function setWorkspaceViewportPosition(position) {
  return {
    payload: {
      position: {
        x: position.x,
        y: position.y,
      },
    },
    type: ActionTypes.SET_WORKSPACE_VIEWPORT_POSITION,
  };
}

/**
 *
 */
export function toggleWorkspaceExposeMode() {
  return {
    type: ActionTypes.TOGGLE_WORKSPACE_EXPOSE_MODE,
  };
}
