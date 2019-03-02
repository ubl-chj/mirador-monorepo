import {
  annotationsReducer,
  companionWindowsReducer,
  configReducer,
  infoResponsesReducer,
  manifestsReducer,
  viewersReducer,
  windowsReducer,
  workspaceReducer,
} from '@mirador/core'
import { combineReducers } from 'redux'

/**
 *
 * @param pluginReducers
 */
export const rootReducer = (pluginReducers) => combineReducers({
  annotations: annotationsReducer,
  companionWindows: companionWindowsReducer,
  config: configReducer,
  infoResponses: infoResponsesReducer,
  manifests: manifestsReducer,
  viewers: viewersReducer,
  windows: windowsReducer,
  workspace: workspaceReducer,
  ...pluginReducers,
})
