import {
  annotationsReducer,
  companionWindowsReducer,
  configReducer,
  infoResponsesReducer,
  manifests,
  thunksReducer,
  viewersReducer,
  windowsReducer,
  workspaceReducer,
} from '@mirador/core'
import { combineReducers } from 'redux'

/**
 *
 */
export const rootReducer = (): any => combineReducers({
  annotations: annotationsReducer,
  companionWindows: companionWindowsReducer,
  config: configReducer,
  infoResponses: infoResponsesReducer,
  manifests,
  thunksReducer,
  viewers: viewersReducer,
  windows: windowsReducer,
  workspace: workspaceReducer,
})
