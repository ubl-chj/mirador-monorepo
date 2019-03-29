import {
  SET_WORKSPACE_ADD_VISIBILITY,
  SET_WORKSPACE_FULLSCREEN,
  SET_WORKSPACE_VIEWPORT_DIMENSIONS,
  SET_WORKSPACE_VIEWPORT_POSITION,
  TOGGLE_WORKSPACE_EXPOSE_MODE,
  TOGGLE_ZOOM_CONTROLS,
  UPDATE_WORKSPACE_MOSAIC_LAYOUT
} from './action-types'
import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

/**
 * setWorkspaceFullscreen - action creator
 *
 * @param  {Boolean} isFullscreenEnabled
 * @memberof ActionCreators
 */
export const setWorkspaceFullscreen = actionCreator<{isFullscreenEnabled: boolean}>(SET_WORKSPACE_FULLSCREEN)

/**
 * toggleZoomControls - action creator
 * @param {Boolean} showZoomControls
 * @memberof ActionCreators
*/
export const toggleZoomControls = actionCreator<{showZoomControls: boolean}>(TOGGLE_ZOOM_CONTROLS)

/**
 * updateWorkspaceMosaicLayout - action creator
 *
 * @param  {Object} layout
 * @memberof ActionCreators
 */
export const updateWorkspaceMosaicLayout = actionCreator<{layout}>(UPDATE_WORKSPACE_MOSAIC_LAYOUT)

/**
 * updateWorkspaceMosaicLayout - action creator
 *
 * @param  {Object} isWorkspaceAddVisible
 * @memberof ActionCreators
 */
export const setWorkspaceAddVisibility = actionCreator<{isWorkspaceAddVisible: boolean}>(SET_WORKSPACE_ADD_VISIBILITY)

/**
 * setWorkspaceViewportPosition - action creator
 *
 * @param  {Object} position
 * @memberof ActionCreators
 */
export const setWorkspaceViewportPosition = actionCreator<{position: {x, y}}>(SET_WORKSPACE_VIEWPORT_POSITION)

/**
 * setWorkspaceViewportDimensions - action creator
 *
 * @param  {Object} position
 * @memberof ActionCreators
 */
export const setWorkspaceViewportDimensions = actionCreator<{position: {height, width}}>(SET_WORKSPACE_VIEWPORT_DIMENSIONS)
/**
 * toggleWorkspaceExposeMode - action creator
 *
 * @memberof ActionCreators
 */
export const toggleWorkspaceExposeMode = actionCreator<{exposeModeOn: boolean}>(TOGGLE_WORKSPACE_EXPOSE_MODE)

