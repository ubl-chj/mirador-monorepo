import {removeWindow, updateViewport} from '../actions'
import {isType} from 'typescript-fsa'

/**
 * viewersReducer
 */
export const viewersReducer = (state = {}, action) => {
  switch (action.type) {
    case isType(action, updateViewport):
      return {
        ...state,
        [action.payload.windowId]: {
          ...action.payload,
        },
      }
    case isType(action, removeWindow):
      return Object.keys(state).reduce((object, key) => {
        if (key !== action.payload.id) {
          object[key] = state[key] // eslint-disable-line no-param-reassign
        }
        return object
      }, {})
    default:
      return state
  }
}
