import {
  annotationsReducer,
  companionWindowsReducer,
  configReducer,
  infoResponsesReducer,
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
  annotations: annotationsReducer,
  companionWindows: companionWindowsReducer,
  config: configReducer,
  infoResponses: infoResponsesReducer,
  manifests,
  viewers: viewersReducer,
  windows: windowsReducer,
  workspace: workspaceReducer,
})
