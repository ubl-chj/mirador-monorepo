import {
  addWindow,
  maximizeWindow,
  minimizeWindow,
  removeCompanionWindow,
  removeWindow,
  selectAnnotation,
  setWindowSideBarPanel,
  setWindowSize,
  setWindowViewType,
  toggleAnnotationDisplay,
  toggleWindowSideBar,
  updateWindowPosition
} from "../actions"
import {reducerWithInitialState} from "typescript-fsa-reducers"
import {remove} from 'immutable';

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
 * Handle removing IDs from selectedAnnotations
 * where empty canvasIDs are removed from state as well
 */
const updatedSelectedAnnotations = (state, action) => {
  const filteredIds = state[action.payload.windowId]
    .selectedAnnotations[action.payload.canvasId]
    .filter(id => id !== action.payload.annotationId);

  if (filteredIds && filteredIds.length > 0) {
    return {
      ...state[action.payload.windowId].selectedAnnotations,
      [action.payload.canvasId]: filteredIds,
    };
  }

  return remove(state[action.payload.windowId].selectedAnnotations, action.payload.canvasId);
}

/**
 * windowsReducer
 */
export const windowsReducer = reducerWithInitialState({})
  .caseWithAction(addWindow, (state, action) => ({
    ...state,
    [action.payload.window.id]: action.payload.window
  }))
  .caseWithAction(maximizeWindow, (state, action) => ({
    ...state,
    [action.payload.id]: {
      ...state[action.payload.id],
      maximized: true,
    },
  }))
  .caseWithAction(minimizeWindow, (state, action) => ({
    ...state,
    [action.payload.id]: {
      ...state[action.payload.id],
      maximized: false,
    },
  }))
  /**
    .caseWithAction(updateWindow, (state, action) => ({
      updateIn({}, [action.payload.id], orig => merge(orig, action.payload))
    }))
   */
  .caseWithAction(toggleWindowSideBar, (state, action) => ({
    ...state,
    [action.payload.id]: {
      ...state[action.payload.id],
      sideBarOpen: !state[action.payload.id].sideBarOpen,
    },
  }))
  .caseWithAction(setWindowViewType, (state, action) => ({
    ...state,
    [action.payload.windowId]: {
      ...state[action.payload.windowId],
      view: action.payload.viewType,
    },
  }))
  .caseWithAction(setWindowSideBarPanel, (state, action) => ({
    ...state,
    [action.payload.windowId]: {
      ...state[action.payload.windowId],
      sideBarPanel: (
        action.payload.panelType
      ),
    },
  }))
  .caseWithAction(updateWindowPosition, (state, action) => ({
    ...state,
    [action.payload.windowId]: {
      ...state[action.payload.windowId],
      x: action.payload.position.x,
      y: action.payload.position.y,
    },
  }))
  .caseWithAction(setWindowSize, (state, action) => ({
    ...state,
    [action.payload.windowId]: {
      ...state[action.payload.windowId],
      height: action.payload.size.height,
      width: action.payload.size.width,
      x: action.payload.size.x,
      y: action.payload.size.y,
    },
  }))
  /**
  .caseWithAction(setCanvas, (state, action) => ({
      setCanvasIndex(state, action.payload.windowId, () => action.payload.canvasIndex)
  }))
   */
  .caseWithAction(removeCompanionWindow, (state, action) => ({
    ...state,
    [action.payload.id]: {
      ...state[action.payload.id],
      companionWindowIds: state[action.payload.id]
        .companionWindowIds.filter(id => id !== action.payload.id),
    },
  }))
  .caseWithAction(selectAnnotation, (state, action) => ({
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
  }))
  /**
  .caseWithAction(deselectAnnotation, (state, action) => ({
        ...state,
        [action.payload.windowId]: {
          ...state[action.payload.windowId],
        updatedSelectedAnnotations(state, action),
        },
      };
  }))
   */
  .caseWithAction(toggleAnnotationDisplay, (state, action) => ({
    ...state,
    [action.payload.windowId]: {
      ...state[action.payload.windowId],
      displayAllAnnotations: !state[action.payload.windowId].displayAllAnnotations,
    },
  }))
  .caseWithAction(removeWindow, (state, action) => {
    return Object.keys(state).filter(key => key !== action.payload.id)
      .reduce((result, current) => {
        result[current] = state[current];
        return result;
      }, {})
  })

