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
    default:
      return state
  }
}
