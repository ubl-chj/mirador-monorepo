import {ADD_COMPANION_WINDOW, ADD_WINDOW, FOCUS_WINDOW, REMOVE_WINDOW} from "../actions"

export interface IState {
  viewportPosition: any
}

const initialState: IState = {
  viewportPosition: null
}

export const thunksReducer = (state: IState = initialState, action) => {
  switch (action.type) {
    case FOCUS_WINDOW:
      return {
        ...state,
        focusedWindowId: action.payload.windowId,
        viewportPosition: {
          ...state.viewportPosition,
          ...action.payload.position,
        },
      };
    case ADD_WINDOW:
      return { ...state, [action.window.id]: action.window };
    case ADD_COMPANION_WINDOW:
      if (action.payload.position === 'left') {
        const { companionWindowIds } = state[action.windowId];
        const { companionWindows } = action;
        const newCompanionWindowIds = companionWindowIds
          .filter(id => companionWindows[id].position !== action.payload.position);

        return {
          ...state,
          [action.windowId]: {
            ...state[action.windowId],
            companionAreaOpen: true,
            companionWindowIds: newCompanionWindowIds.concat([action.id]),
            sideBarPanel: action.payload.content,
          },
        };
      }
      return {
        ...state,
        [action.windowId]: {
          ...state[action.windowId],
          companionWindowIds: state[action.windowId].companionWindowIds.concat([action.id]),
        },
      };
    case REMOVE_WINDOW:
      return Object.keys(state).reduce((object, key) => {
        if (key !== action.windowId) {
          object[key] = state[key]; // eslint-disable-line no-param-reassign
        }
        return object;
      }, {});
    default: return state;
  }
}
