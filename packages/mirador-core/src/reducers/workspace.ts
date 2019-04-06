import {
  focusWindow,
  setWorkspaceAddVisibility,
  setWorkspaceFullscreen,
  setWorkspaceViewportDimensions,
  setWorkspaceViewportPosition,
  toggleWorkspaceExposeMode,
  toggleZoomControls,
  updateWorkspaceMosaicLayout
} from '../actions'
import {IWorkspace} from 'mirador-core-model'
import {reducerWithInitialState} from 'typescript-fsa-reducers'

const initialState: IWorkspace = {
  enabled: false,
  exposeModeOn: false,
  height: 5000,
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
export const workspaceReducer = reducerWithInitialState(initialState)
  .caseWithAction(focusWindow, (state, action: any) => ({
    ...state,
    focusedWindowId: action.payload.windowId,
    viewportPosition: {
      ...state.viewportPosition,
      ...action.payload.position,
    }}))
  .caseWithAction(setWorkspaceFullscreen, (state, action: any) => ({
    ...state, enabled: action.payload.enabled }))
  .caseWithAction(toggleZoomControls, (state, action: any) => ({
    ...state, showZoomControls: action.payload.showZoomControls }))
  .caseWithAction(updateWorkspaceMosaicLayout, (state: IWorkspace, action: any) => ({
    ...state, layout: action.payload.layout }))
  .caseWithAction(setWorkspaceAddVisibility, (state: IWorkspace, action: any) => ({
    ...state, isWorkspaceAddVisible: action.payload.isWorkspaceAddVisible }))
  .caseWithAction(setWorkspaceViewportPosition, (state: IWorkspace, action: any) => ({
    ...state,
    viewportPosition: {
      ...state.viewportPosition,
      ...action.payload.position,
    },
  }))
  .caseWithAction(setWorkspaceViewportDimensions, (state: IWorkspace, action: any) => ({
    ...state,
    viewportPosition: {
      ...state.viewportPosition,
      ...action.payload.position,
    },
  }))
  .case(toggleWorkspaceExposeMode, (state: IWorkspace) => ({
    ...state, exposeModeOn: !state.exposeModeOn }))
