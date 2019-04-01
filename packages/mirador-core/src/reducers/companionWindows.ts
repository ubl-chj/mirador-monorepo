import {addCompanionWindow, addWindow, removeCompanionWindow, updateCompanionWindow} from "../actions"
import {merge, removeIn, setIn, updateIn} from 'immutable'
import {isType} from 'typescript-fsa'

/**
 case ADD_COMPANION_WINDOW:
 if (action.payload.position === 'left') {
        const { companionWindowIds } = state[action.payload.windowId];
        const { companionWindows } = action;
        const newCompanionWindowIds = companionWindowIds
          .filter(id => companionWindows[id].position !== action.payload.position);

        return {
          ...state,
          [action.payload.windowId]: {
            ...state[action.payload.windowId],
            companionAreaOpen: true,
            companionWindowIds: newCompanionWindowIds.concat([action.payload.id]),
            sideBarPanel: action.payload.content,
          },
        };
      }
 return {
        ...state,
        [action.payload.windowId]: {
          ...state[action.payload.windowId],
          companionWindowIds: state[action.payload.windowId].companionWindowIds.concat([action.payload.id]),
        },
      };

 }
 * */
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
  if (isType(action, updateCompanionWindow)) {
    return updateIn(state, [action.payload.id], (orig) => merge(orig, action.payload))
  }

  if (isType(action, removeCompanionWindow)) {
    return removeIn(state, [action.payload.id])
  }
  return state
}
