import ActionTypes from '@mirador/core';

/**
 * workspaceReducer
 */
export const workspaceReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.FOCUS_WINDOW:
      return { ...state, focusedWindowId: action.windowId };
    case ActionTypes.SET_WORKSPACE_FULLSCREEN:
      return { ...state, isFullscreenEnabled: action.isFullscreenEnabled };
    case ActionTypes.TOGGLE_ZOOM_CONTROLS:
      return { ...state, showZoomControls: action.showZoomControls };
    case ActionTypes.UPDATE_WORKSPACE_MOSAIC_LAYOUT:
      return { ...state, layout: action.layout };
    case ActionTypes.SET_WORKSPACE_ADD_VISIBILITY:
      return { ...state, isWorkspaceAddVisible: action.isWorkspaceAddVisible };
    default:
      return state;
  }
};
