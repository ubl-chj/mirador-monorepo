import {
  annotations,
  companionWindowsReducer,
  configReducer,
  infoResponses,
  manifests,
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
  viewers: viewersReducer,
  windows: windowsReducer,
  workspace: workspaceReducer,
})
