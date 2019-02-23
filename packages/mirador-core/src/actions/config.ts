import {ActionTypes} from './action-types'

/**
 * setConfig
 * @param config
 */
export function setConfig(config) {
  return { type: ActionTypes.SET_CONFIG, config }
}

/**
 * updateConfig
 * @param config
 */
export function updateConfig(config) {
  return { type: ActionTypes.UPDATE_CONFIG, config }
}
