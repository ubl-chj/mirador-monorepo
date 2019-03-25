import {SET_WORKSPACE_ADD_VISIBILITY, SET_WORKSPACE_FULLSCREEN, SET_WORKSPACE_VIEWPORT_POSITION,
  TOGGLE_WORKSPACE_EXPOSE_MODE, TOGGLE_ZOOM_CONTROLS, UPDATE_WORKSPACE_MOSAIC_LAYOUT} from './action-types'

/**
 * setWorkspaceFullscreen - action creator
 *
 * @param  {Boolean} isFullscreenEnabled
 * @memberof ActionCreators
 */
export const setWorkspaceFullscreen = (isFullscreenEnabled) => {
  return { isFullscreenEnabled, type: SET_WORKSPACE_FULLSCREEN };
}

/**
 * toggleZoomControls - action creator
 * @param {Boolean} showZoomControls
 * @memberof ActionCreators
*/
export const toggleZoomControls = (showZoomControls) => {
  return { showZoomControls, type: TOGGLE_ZOOM_CONTROLS };
}

/**
 * updateWorkspaceMosaicLayout - action creator
 *
 * @param  {Object} layout
 * @memberof ActionCreators
 */
export const updateWorkspaceMosaicLayout = (layout) => {
  return { layout, type: UPDATE_WORKSPACE_MOSAIC_LAYOUT };
}

/**
 * updateWorkspaceMosaicLayout - action creator
 *
 * @param  {Object} isWorkspaceAddVisible
 * @memberof ActionCreators
 */
export const setWorkspaceAddVisibility = (isWorkspaceAddVisible) => {
  return { isWorkspaceAddVisible, type: SET_WORKSPACE_ADD_VISIBILITY };
}

/**
 * setWorkspaceViewportPosition - action creator
 *
 * @param  {Object} position
 * @memberof ActionCreators
 */
export const setWorkspaceViewportPosition = ({ x, y }) => {
  return {
    payload: {
      position: {
        x,
        y,
      },
    },
    type: SET_WORKSPACE_VIEWPORT_POSITION,
  };
}

/**
 * setWorkspaceViewportDimensions - action creator
 *
 * @param  {Object} position
 * @memberof ActionCreators
 */
export const setWorkspaceViewportDimensions = ({ width, height }) => {
  return {
    payload: {
      position: {
        height,
        width,
      },
    },
    type: SET_WORKSPACE_VIEWPORT_POSITION,
  };
}
/**
 * toggleWorkspaceExposeMode - action creator
 *
 * @memberof ActionCreators
 */
export const toggleWorkspaceExposeMode = () => {
  return {
    type: TOGGLE_WORKSPACE_EXPOSE_MODE,
  };
}
