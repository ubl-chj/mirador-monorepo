import {REMOVE_COMPANION_WINDOW, UPDATE_COMPANION_WINDOW} from '../actions'
import {merge, removeIn, setIn, updateIn} from 'immutable'
import {ActionType, getType} from "typesafe-actions"
import * as companionWindowsActions from "../actions/companionWindow"
import * as canvasActions from "../actions/canvas"
import * as windowActions from "../actions/window"

export type CompanionWindowAction = ActionType<typeof companionWindowsActions & typeof canvasActions
  & typeof windowActions>

/** */
export const companionWindowsReducer = (state = {}, action: CompanionWindowAction) => {
  switch (action.type) {
    case getType(companionWindowsActions.addCompanionWindow):
      return setIn(state, [action.payload.id], action.payload)

    case getType(windowActions.addWindow):
      return action.payload.companionWindows.reduce((newState, cw) => {
        newState[cw.id] = cw; // eslint-disable-line no-param-reassign
        return newState;
      }, state);

    case getType(windowActions.removeWindow):
      return action.companionWindowIds.reduce((newState, id) => removeIn(newState, [id]), state);

    case UPDATE_COMPANION_WINDOW:
      return updateIn(state, [action.id], (orig) => merge(orig, action.payload))

    case REMOVE_COMPANION_WINDOW:
      return removeIn(state, [action.id])

    default:
      return state
  }
}
