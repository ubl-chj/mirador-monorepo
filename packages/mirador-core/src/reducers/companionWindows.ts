import {ADD_COMPANION_WINDOW, ADD_WINDOW, REMOVE_COMPANION_WINDOW, REMOVE_WINDOW, UPDATE_COMPANION_WINDOW} from '../actions'
import {merge, removeIn, setIn, updateIn} from 'immutable'

/** */
export const companionWindowsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_COMPANION_WINDOW:
      return setIn(state, [action.id], action.payload)

    case ADD_WINDOW:
      return action.companionWindows.reduce((newState, cw) => {
        newState[cw.id] = cw; // eslint-disable-line no-param-reassign
        return newState;
      }, state);

    case REMOVE_WINDOW:
      return action.companionWindowIds.reduce((newState, id) => removeIn(newState, [id]), state);

    case UPDATE_COMPANION_WINDOW:
      return updateIn(state, [action.id], (orig) => merge(orig, action.payload))

    case REMOVE_COMPANION_WINDOW:
      return removeIn(state, [action.id])

    default:
      return state
  }
}
