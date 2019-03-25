import {SET_CONFIG, UPDATE_CONFIG} from './action-types'

/**
 * setConfig
 * @param config
 */
export const setConfig = (config) => {
  return { config, type: SET_CONFIG };
}

/**
 * updateConfig
 * @param config
 */
export const updateConfig = (config) => {
  return { config, type: UPDATE_CONFIG };
}
