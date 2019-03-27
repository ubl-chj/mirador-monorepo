import * as annotationActions from '../actions/annotation'
import * as canvasActions from '../actions/canvas'
import * as companionWindowsActions from '../actions/companionWindow'
import * as windowActions from '../actions/window'
import {ActionType, getType} from 'typesafe-actions';
import { merge, remove, updateIn } from 'immutable';


export type WindowAction = ActionType<typeof companionWindowsActions & typeof canvasActions & typeof windowActions & typeof annotationActions>
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
export const windowsReducer = (state = {}, action: WindowAction) => {
  switch (action.type) {
    case getType(windowActions.maximizeWindow):
      return {
        ...state,
        [action.payload.windowId]: {
          ...state[action.payload.windowId],
          maximized: true,
        },
      };
    case getType(windowActions.minimizeWindow):
      return {
        ...state,
        [action.payload.windowId]: {
          ...state[action.payload.windowId],
          maximized: false,
        },
      }

    case getType(windowActions.updateWindow):
      return updateIn(state, [action.payload.id], orig => merge(orig, action.payload));

    case getType(windowActions.toggleWindowSideBar):
      return {
        ...state,
        [action.payload.windowId]: {
          ...state[action.payload.windowId],
          sideBarOpen: !state[action.payload.windowId].sideBarOpen,
        },
      }
    case getType(windowActions.setWindowViewType):
      return {
        ...state,
        [action.payload.windowId]: {
          ...state[action.payload.windowId],
          view: action.payload.viewType,
        },
      };
    case getType(windowActions.setWindowSideBarPanel):
      return {
        ...state,
        [action.payload.windowId]: {
          ...state[action.payload.windowId],
          sideBarPanel: (
            action.payload.panelType
          ),
        },
      }
    case getType(windowActions.updateWindowPosition):
      return {
        ...state,
        [action.payload.windowId]: {
          ...state[action.payload.windowId],
          x: action.payload.position.x,
          y: action.payload.position.y,
        },
      }
    case getType(windowActions.setWindowSize):
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
    case getType(canvasActions.setCanvas):
      return setCanvasIndex(state, action.payload.windowId, () => action.payload.canvasIndex)

    case getType(companionWindowsActions.removeCompanionWindow):
      return {
        ...state,
        [action.payload.windowId]: {
          ...state[action.payload.windowId],
          companionWindowIds: state[action.payload.windowId]
            .companionWindowIds.filter(id => id !== action.payload.id),
        },
      };
    case getType(annotationActions.selectAnnotation):
      return {
        ...state,
        [action.payload.windowId]: {
          ...state[action.payload.windowId],
          selectedAnnotations: {
            ...state[action.payload.windowId].selectedAnnotations,
            [action.payload.canvasId]: [
              ...((state[action.payload.windowId].selectedAnnotations || {})[action.payload.canvasId] || []),
              action.payload.annotationId,
            ],
          },
        },
      };
    case getType(annotationActions.deselectAnnotation): {
      const selectedAnnotations = updatedSelectedAnnotations(state, action);

      return {
        ...state,
        [action.payload.windowId]: {
          ...state[action.payload.windowId],
          selectedAnnotations,
        },
      };
    }
    case getType(annotationActions.toggleAnnotationDisplay):
      return {
        ...state,
        [action.payload.windowId]: {
          ...state[action.payload.windowId],
          displayAllAnnotations: !state[action.payload.windowId].displayAllAnnotations,
        },
      };
    default:
      return state
  }
};


