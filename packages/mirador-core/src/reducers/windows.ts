import {ADD_COMPANION_WINDOW, ADD_WINDOW, DESELECT_ANNOTATION, MAXIMIZE_WINDOW, MINIMIZE_WINDOW, REMOVE_COMPANION_WINDOW, REMOVE_WINDOW,
  SELECT_ANNOTATION, SET_CANVAS, SET_WINDOW_SIDE_BAR_PANEL, SET_WINDOW_SIZE, SET_WINDOW_VIEW_TYPE, TOGGLE_ANNOTATION_DISPLAY,
  TOGGLE_WINDOW_SIDE_BAR, UPDATE_WINDOW, UPDATE_WINDOW_POSITION} from '../actions';
import { merge, remove, updateIn } from 'immutable';
import {IWindow} from 'Models'
/**
 * Handle removing IDs from selectedAnnotations
 * where empty canvasIDs are removed from state as well
 */
const updatedSelectedAnnotations = (state, action) => {
  const filteredIds = state[action.windowId]
    .selectedAnnotations[action.canvasId]
    .filter(id => id !== action.annotationId);

  if (filteredIds.length > 0) {
    return {
      ...state[action.windowId].selectedAnnotations,
      [action.canvasId]: filteredIds,
    };
  }

  return remove(state[action.windowId].selectedAnnotations, action.canvasId);
}

/**
 * @param {Object} state
 * @param {String} windowId
 * @param {Function} getIndex - gets curent canvas index passed and should return new index
 */
const setCanvasIndex = (state, windowId, getIndex) => {
  return Object.values(state).reduce((object, window: any) => {
    if (window.id === windowId) {
      return {
        ...object,
        [window.id]: {
          ...window,
          canvasIndex: getIndex(window.canvasIndex),
        },
      }
    }
    return { ...object, [window.id]: window }
  }, {})
}


/**
 * windowsReducer
 */
export const windowsReducer = (state, action) => {
  switch (action.type) {
    case ADD_WINDOW:
      return { ...state, [action.window.id]: action.window };

    case MAXIMIZE_WINDOW:
      return {
        ...state,
        [action.windowId]: {
          ...state[action.windowId],
          maximized: true,
        },
      };
    case MINIMIZE_WINDOW:
      return {
        ...state,
        [action.windowId]: {
          ...state[action.windowId],
          maximized: false,
        },
      }

    case UPDATE_WINDOW:
      return updateIn(state, [action.id], orig => merge(orig, action.payload));

    case REMOVE_WINDOW:
      return Object.keys(state).reduce((object, key) => {
        if (key !== action.windowId) {
          object[key] = state[key]; // eslint-disable-line no-param-reassign
        }
        return object;
      }, {});
    case TOGGLE_WINDOW_SIDE_BAR:
      return {
        ...state,
        [action.windowId]: {
          ...state[action.windowId],
          sideBarOpen: !state[action.windowId].sideBarOpen,
        },
      }
    case SET_WINDOW_VIEW_TYPE:
      return {
        ...state,
        [action.windowId]: {
          ...state[action.windowId],
          view: action.viewType,
        },
      };
    case SET_WINDOW_SIDE_BAR_PANEL:
      return {
        ...state,
        [action.windowId]: {
          ...state[action.windowId],
          sideBarPanel: (
            action.panelType
          ),
        },
      }
    case UPDATE_WINDOW_POSITION:
      return {
        ...state,
        [action.payload.windowId]: {
          ...state[action.payload.windowId],
          x: action.payload.position.x,
          y: action.payload.position.y,
        },
      }
    case SET_WINDOW_SIZE:
      return {
        ...state,
        [action.payload.windowId]: {
          ...state[action.payload.windowId],
          height: action.payload.size.height,
          width: action.payload.size.width,
          x: action.payload.size.x,
          y: action.payload.size.y,
        },
      }
    case SET_CANVAS:
      return setCanvasIndex(state, action.windowId, () => action.canvasIndex)
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
    case REMOVE_COMPANION_WINDOW:
      return {
        ...state,
        [action.windowId]: {
          ...state[action.windowId],
          companionWindowIds: state[action.windowId]
            .companionWindowIds.filter(id => id !== action.id),
        },
      };
    case SELECT_ANNOTATION:
      return {
        ...state,
        [action.windowId]: {
          ...state[action.windowId],
          selectedAnnotations: {
            ...state[action.windowId].selectedAnnotations,
            [action.canvasId]: [
              ...((state[action.windowId].selectedAnnotations || {})[action.canvasId] || []),
              action.annotationId,
            ],
          },
        },
      };
    case DESELECT_ANNOTATION: {
      const selectedAnnotations = updatedSelectedAnnotations(state, action);

      return {
        ...state,
        [action.windowId]: {
          ...state[action.windowId],
          selectedAnnotations,
        },
      };
    }
    case TOGGLE_ANNOTATION_DISPLAY:
      return {
        ...state,
        [action.windowId]: {
          ...state[action.windowId],
          displayAllAnnotations: !state[action.windowId].displayAllAnnotations,
        },
      };
    default:
      return state
  }
};


