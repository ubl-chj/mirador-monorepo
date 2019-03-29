import {
  annotations,
  companionWindowsReducer,
  configReducer,
  infoResponses,
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
  annotations,
  companionWindows: companionWindowsReducer,
  config: configReducer,
  infoResponses,
  manifests,
  thunksReducer,
  viewers: viewersReducer,
  windows: windowsReducer,
  workspace: workspaceReducer,
})
