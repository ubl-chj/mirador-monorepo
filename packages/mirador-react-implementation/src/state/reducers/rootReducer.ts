import {
  configReducer, infoResponsesReducer, manifestsReducer, windowsReducer, workspaceReducer,
} from '@mirador/react-component'
import { combineReducers } from 'redux'

/**
 *
 * @param pluginReducers
 */
export const rootReducer = (pluginReducers) => combineReducers({
  config: configReducer,
  infoResponses: infoResponsesReducer,
  manifests: manifestsReducer,
  windows: windowsReducer,
  workspace: workspaceReducer,
  ...pluginReducers,
})
