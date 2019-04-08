import {collectGarbage, updateViewport} from '../actions'
import {reducerWithInitialState} from 'typescript-fsa-reducers'

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
  .caseWithAction(collectGarbage, (state, action) => {
    return Object.keys(state).reduce((object, key) => {
      if (key !== action.payload.id) {
        object[key] = state[key];
      }
      return object;
    }, {});
  })
