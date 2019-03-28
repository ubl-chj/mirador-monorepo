import * as workspaceActions from '../actions/workspace'
import {ActionType, getType} from 'typesafe-actions';
import {IWorkspace} from 'mirador-core-model'

export type WorkspaceAction = ActionType<typeof workspaceActions>

const initialState: IWorkspace = {
  exposeModeOn: false,
  height: 5000,
  isFullscreenEnabled: false,
  isWorkspaceAddVisible: false,
  layout: {
    direction: null,
    first: null,
    second: null
  },
  showZoomControls: false,
  viewportPosition: {
    x: 0,
    y: 0,
  },
  width: 5000,
}

/**
 * workspaceReducer
 */
export const workspaceReducer = (state: IWorkspace = initialState, action: WorkspaceAction): IWorkspace => {
  switch (action.type) {
    case getType(workspaceActions.setWorkspaceFullscreen):
      return { ...state, isFullscreenEnabled: action.payload.isFullscreenEnabled };
    case getType(workspaceActions.toggleZoomControls):
      return { ...state, showZoomControls: action.payload.showZoomControls };
    case getType(workspaceActions.updateWorkspaceMosaicLayout):
      return { ...state, ...action.payload.layout };
    case getType(workspaceActions.setWorkspaceAddVisibility):
      return { ...state, isWorkspaceAddVisible: action.payload.isWorkspaceAddVisible };
    case getType(workspaceActions.setWorkspaceViewportPosition):
      return {
        ...state,
        viewportPosition: {
          ...state.viewportPosition,
          ...action.payload.position,
        },
      };
    case getType(workspaceActions.toggleWorkspaceExposeMode):
      return { ...state, exposeModeOn: !state.exposeModeOn };
    default:
      return state;
  }
};
