import {SET_CONFIG, UPDATE_CONFIG} from '../actions'
import deepmerge from 'deepmerge'

/**
 * configReducer - does a deep merge of the config
 */
export const configReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_CONFIG:
      return deepmerge(state, action.config)
    case SET_CONFIG:
      return action.config
    default:
      return state
  }
}
