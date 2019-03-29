import {
  setWorkspaceAddVisibility,
  setWorkspaceFullscreen,
  setWorkspaceViewportPosition,
  toggleWorkspaceExposeMode,
  toggleZoomControls,
  updateWorkspaceMosaicLayout
} from '../actions'
import {IWorkspace} from 'mirador-core-model'
import {isType} from 'typescript-fsa'

const initialState: IWorkspace = {
  exposeModeOn: false,
  height: 5000,
  isFullscreenEnabled: false,
  isWorkspaceAddVisible: false,
  layout: {},
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
export const workspaceReducer = (state: IWorkspace = initialState, action): IWorkspace => {
  switch (action.type) {
    case isType(action, setWorkspaceFullscreen):
      return { ...state, isFullscreenEnabled: action.payload.isFullscreenEnabled };
    case isType(action, toggleZoomControls):
      return { ...state, showZoomControls: action.payload.showZoomControls };
    case isType(action, updateWorkspaceMosaicLayout):
      return { ...state, layout: action.payload.layout };
    case isType(action, setWorkspaceAddVisibility):
      return { ...state, isWorkspaceAddVisible: action.payload.isWorkspaceAddVisible };
    case isType(action, setWorkspaceViewportPosition):
      return {
        ...state,
        viewportPosition: {
          ...state.viewportPosition,
          ...action.payload.position,
        },
      };
    case isType(action, toggleWorkspaceExposeMode):
      return { ...state, exposeModeOn: !state.exposeModeOn };
    default:
      return state;
  }
};
