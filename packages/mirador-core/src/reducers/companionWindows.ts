import {addCompanionWindow, addWindow, removeCompanionWindow, removeWindow} from "../actions"
import {removeIn, setIn} from 'immutable'
import {isType} from 'typescript-fsa'

/** */
export const companionWindowsReducer = (state = {}, action) => {
  switch (action.type) {
    case isType(action, addCompanionWindow):
      return setIn(state, [action.payload.id], action.payload)

    case isType(action, addWindow):
      return action.payload.companionWindows.reduce((newState, cw) => {
        newState[cw.id] = cw; // eslint-disable-line no-param-reassign
        return newState;
      }, state);

    case isType(action, removeWindow):
      return action.payload.companionWindowIds.reduce((newState, id) => removeIn(newState, [id]), state);

      // case getType(companionWindowActions.updateCompanionWindow):
      //   return updateIn(state, [action.payload.id], (orig) => merge(orig, action.payload))

    case isType(action, removeCompanionWindow):
      return removeIn(state, [action.payload.id])

    default:
      return state
  }
}
