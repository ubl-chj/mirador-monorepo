import {ActionTypes} from '@mirador/actions'
import deepmerge from 'deepmerge'

/**
 * configReducer - does a deep merge of the config
 */
export const configReducer = (state = {}, action) => {
  switch (action.type) {
  case ActionTypes.UPDATE_CONFIG:
    return deepmerge(state, action.config)
  case ActionTypes.SET_CONFIG:
    return action.config
  default:
    return state
  }
}
