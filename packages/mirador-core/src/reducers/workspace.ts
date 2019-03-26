import * as workspaceActions from '../actions/workspace';
import {ActionType, getType} from 'typesafe-actions';
import {FOCUS_WINDOW, SET_WORKSPACE_ADD_VISIBILITY, SET_WORKSPACE_VIEWPORT_POSITION, TOGGLE_WORKSPACE_EXPOSE_MODE,
  TOGGLE_ZOOM_CONTROLS, UPDATE_WORKSPACE_MOSAIC_LAYOUT, setWorkspaceFullscreen} from '../actions';

export type WorkspaceAction = ActionType<typeof workspaceActions>;
/**
 * workspaceReducer
 */
export const workspaceReducer = (
  state = { // we'll need to abstract this more, methinks.
    exposeModeOn: false,
    height: 5000,
    viewportPosition: {
      x: 0,
      y: 0,
    },
    width: 5000,
  },
  action,
) => {
  switch (action.type) {
    case FOCUS_WINDOW:
      return {
        ...state,
        focusedWindowId: action.windowId,
        viewportPosition: {
          ...state.viewportPosition,
          ...action.position,
        },
      };
    case getType(setWorkspaceFullscreen):
      return { ...state, isFullscreenEnabled: action.payload.isFullscreenEnabled };
    case TOGGLE_ZOOM_CONTROLS:
      return { ...state, showZoomControls: action.showZoomControls };
    case UPDATE_WORKSPACE_MOSAIC_LAYOUT:
      return { ...state, layout: action.layout };
    case SET_WORKSPACE_ADD_VISIBILITY:
      return { ...state, isWorkspaceAddVisible: action.isWorkspaceAddVisible };
    case SET_WORKSPACE_VIEWPORT_POSITION:
      return {
        ...state,
        viewportPosition: {
          ...state.viewportPosition,
          ...action.payload.position,
        },
      };
    case TOGGLE_WORKSPACE_EXPOSE_MODE:
      return { ...state, exposeModeOn: !state.exposeModeOn };
    default:
      return state;
  }
};
