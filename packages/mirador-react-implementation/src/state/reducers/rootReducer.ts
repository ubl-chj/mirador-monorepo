import {
  companionWindowsReducer, configReducer, infoResponsesReducer, manifestsReducer, viewersReducer, windowsReducer, workspaceReducer,
} from '@mirador/reducers'
import { combineReducers } from 'redux'

/**
 *
 * @param pluginReducers
 */
export const rootReducer = (pluginReducers) => combineReducers({
  companionWindows: companionWindowsReducer,
  config: configReducer,
  infoResponses: infoResponsesReducer,
  manifests: manifestsReducer,
  viewers: viewersReducer,
  windows: windowsReducer,
  workspace: workspaceReducer,
  ...pluginReducers,
})
