import {
  merge, removeIn, setIn, updateIn,
} from 'immutable'
import {ActionTypes} from '../actions'

/** */
export const companionWindowsReducer = (state = {}, action) => {
  switch (action.type) {
  case ActionTypes.ADD_COMPANION_WINDOW:
      return setIn(state, [action.id], action.payload)

  case ActionTypes.ADD_WINDOW:
    return action.companionWindows.reduce((newState, cw) => {
      newState[cw.id] = cw; // eslint-disable-line no-param-reassign
      return newState;
    }, state)

  case ActionTypes.UPDATE_COMPANION_WINDOW:
    return updateIn(state, [action.id], (orig) => merge(orig, action.payload))

  case ActionTypes.REMOVE_COMPANION_WINDOW:
    return removeIn(state, [action.id])

  default:
    return state
  }
}
