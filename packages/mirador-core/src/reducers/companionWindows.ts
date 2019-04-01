import {addCompanionWindow, addWindow, removeCompanionWindow, removeWindow, updateCompanionWindow} from "../actions"
import {merge, removeIn, setIn, updateIn} from 'immutable'
import {isType} from 'typescript-fsa'

/** */
export const companionWindowsReducer = (state = {}, action: any) => {
  if (isType(action, addCompanionWindow)) {
    return setIn(state, [action.payload.id], action.payload)
  }
  if (isType(action, addWindow)) {
    return action.payload.companionWindows.reduce((newState, cw) => {
      newState[cw.id] = cw; // eslint-disable-line no-param-reassign
      return newState;
    }, state);
  }
  if (isType(action, removeWindow)) {
    return action.payload.companionWindowIds.reduce((newState, id) => removeIn(newState, [id]), state);
  }
  if (isType(action, updateCompanionWindow)) {
    return updateIn(state, [action.payload.id], (orig) => merge(orig, action.payload))
  }

  if (isType(action, removeCompanionWindow)) {
    return removeIn(state, [action.payload.id])
  }
  return state
}
