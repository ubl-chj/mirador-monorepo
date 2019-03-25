import {REMOVE_WINDOW, UPDATE_VIEWPORT} from '../actions'

/**
 * viewersReducer
 */
export const viewersReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_VIEWPORT:
      return {
        ...state,
        [action.windowId]: {
          ...action.payload,
        },
      }
    case REMOVE_WINDOW:
      return Object.keys(state).reduce((object, key) => {
        if (key !== action.windowId) {
          object[key] = state[key] // eslint-disable-line no-param-reassign
        }
        return object
      }, {})
    default:
      return state
  }
}
