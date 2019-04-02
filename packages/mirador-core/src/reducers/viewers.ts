import {reducerWithInitialState} from 'typescript-fsa-reducers'
import {updateViewport} from '../actions'

/**
 * viewersReducer
 */
export const viewersReducer = reducerWithInitialState({})
  .caseWithAction(updateViewport, (state, action) => ({
    ...state,
    [action.payload.windowId]: {
      x: action.payload.x,
      y: action.payload.y,
      zoom: action.payload.zoom,
    },
  }))
