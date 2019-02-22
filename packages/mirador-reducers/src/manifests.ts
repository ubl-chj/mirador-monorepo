import {ActionTypes} from '@mirador/actions'
// @ts-ignore
const manifesto = require('manifesto.js')

/**
 * manifestsReducer
 */
export const manifestsReducer = (state = {}, action) => {
  switch (action.type) {
  case ActionTypes.REQUEST_MANIFEST:
    return {
      ...state,
      [action.manifestId]: {
        ...state[action.manifestId],
        ...action.properties,
        id: action.manifestId,
      },
    }
  case ActionTypes.RECEIVE_MANIFEST:
    return {
      ...state,
      [action.manifestId]: {
        ...state[action.manifestId],
        error: null,
        id: action.manifestId,
        isFetching: false,
        manifestation: manifesto.create(action.manifestJson),
      },
    }
  case ActionTypes.RECEIVE_MANIFEST_FAILURE:
    return {
      ...state,
      [action.manifestId]: {
        ...state[action.manifestId],
        error: action.error,
        id: action.manifestId,
        isFetching: false,
      },
    }
  case ActionTypes.REMOVE_MANIFEST:
    return Object.keys(state).reduce((object, key) => {
      if (key !== action.manifestId) {
        object[key] = state[key] // eslint-disable-line no-param-reassign
      }
      return object
    }, {})
  default: return state
  }
}
