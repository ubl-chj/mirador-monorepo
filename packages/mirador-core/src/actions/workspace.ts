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

export const setWorkspaceFullscreen = actionCreator<{enabled: boolean}>(SET_WORKSPACE_FULLSCREEN)

export const toggleZoomControls = actionCreator<{showZoomControls: boolean}>(TOGGLE_ZOOM_CONTROLS)

export const updateWorkspaceMosaicLayout = actionCreator<{layout}>(UPDATE_WORKSPACE_MOSAIC_LAYOUT)

export const setWorkspaceAddVisibility = actionCreator<{isWorkspaceAddVisible: boolean}>(SET_WORKSPACE_ADD_VISIBILITY)

export const setWorkspaceViewportPosition = actionCreator<{position: {x, y}}>(SET_WORKSPACE_VIEWPORT_POSITION)

export const setWorkspaceViewportDimensions = actionCreator<{position: {height, width}}>(SET_WORKSPACE_VIEWPORT_DIMENSIONS)

export const toggleWorkspaceExposeMode = actionCreator<{exposeModeOn: boolean}>(TOGGLE_WORKSPACE_EXPOSE_MODE)

