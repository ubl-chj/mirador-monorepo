import {addCompanionWindow, addWindow, collectGarbage, removeCompanionWindow, updateCompanionWindow} from "../actions"
import {merge, removeIn, setIn, updateIn} from 'immutable'
import {reducerWithInitialState} from 'typescript-fsa-reducers'
import uuid from 'uuid/v4'

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
export const companionWindowsReducer = reducerWithInitialState({})
  .caseWithAction(addCompanionWindow, (state, action: any) => {
    const cwDefault = `cw-${uuid()}`;
    return setIn(state, [cwDefault], action.payload)
  })
  .caseWithAction(addWindow, (state, action: any) => {
    return action.payload.companionWindows.reduce((newState, cw) => {
      newState[cw.id] = cw; // eslint-disable-line no-param-reassign
      return newState;
    }, state);
  })
  .caseWithAction(updateCompanionWindow, (state, action: any) => {
    return updateIn(state, [action.payload.id], (orig) => merge(orig, action.payload))
  })
  .caseWithAction(removeCompanionWindow, (state, action: any) => {
    return removeIn(state, [action.payload.id])
  })
  .caseWithAction(collectGarbage, (state, action) => {
    return action.payload.children.reduce((state, id) => removeIn(state, [id]), state)
  })
