import {ADD_COMPANION_WINDOW, FOCUS_WINDOW, REMOVE_WINDOW} from "../actions"

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
    case REMOVE_WINDOW:
      return Object.keys(state).reduce((object, key) => {
        if (key !== action.payload.windowId) {
          object[key] = state[key]; // eslint-disable-line no-param-reassign
        }
        return object;
      }, {});
    default: return state;
  }
}
