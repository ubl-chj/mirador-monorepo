import {ActionTypes} from '../actions'

/**
 * infoResponsesReducer
 */
export const infoResponsesReducer = (state = {}, action) => {
  switch (action.type) {
  case ActionTypes.REQUEST_INFO_RESPONSE:
    return {
      ...state,
      [action.infoId]: {
        id: action.infoId,
        isFetching: true,
      },
    }
  case ActionTypes.RECEIVE_INFO_RESPONSE:
    return {
      ...state,
      [action.infoId]: {
        id: action.infoId,
        isFetching: false,
        json: action.infoJson,
      },
    }
  case ActionTypes.RECEIVE_INFO_RESPONSE_FAILURE:
    return {
      ...state,
      [action.infoId]: {
        error: action.error,
        id: action.infoId,
        isFetching: false,
      },
    }
  case ActionTypes.REMOVE_INFO_RESPONSE:
    return Object.keys(state).reduce((object, key) => {
      if (key !== action.infoId) {
        object[key] = state[key] // eslint-disable-line no-param-reassign
      }
      return object
    }, {})
  default: return state
  }
}
