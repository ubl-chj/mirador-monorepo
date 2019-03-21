import {ActionTypes} from './action-types'

/**
 * setConfig
 * @param config
 */
export function setConfig(config) {
  return { config, type: ActionTypes.SET_CONFIG };
}

/**
 * updateConfig
 * @param config
 */
export function updateConfig(config) {
  return { config, type: ActionTypes.UPDATE_CONFIG };
}
