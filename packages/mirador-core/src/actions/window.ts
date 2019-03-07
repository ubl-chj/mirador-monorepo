import uuid from 'uuid/v4'
import {ActionTypes} from './action-types'
import { removeCompanionWindow } from './companionWindow'

/**
 * focusWindow - action creator
 *
 * @param  {String} windowId
 * @memberof ActionCreators
 */
export function focusWindow(windowId) {
  return { type: ActionTypes.FOCUS_WINDOW, windowId }
}

/**
 * addWindow - action creator
 *
 * @param  {Object} options
 * @memberof ActionCreators
 */
export function addWindow(options) {
  const defaultOptions = {
    canvasIndex: 0,
    collectionIndex: 0,
    companionWindowIds: [],
    height: 400,
    id: `window-${uuid()}`,
    manifestId: null,
    rangeId: null,
    rotation: null,
    thumbnailNavigationPosition: 'bottom', // bottom by default in settings.js
    view: 'single',
    width: 400,
    x: 2700,
    y: 2700,
  }
  return { type: ActionTypes.ADD_WINDOW, window: { ...defaultOptions, ...options } }
}

/** */
export function updateWindow(id, payload) {
  return { type: ActionTypes.UPDATE_WINDOW, id, payload }
}

/**
 * removeWindow - action creator
 *
 * @param  {String} windowId
 * @memberof ActionCreators
 */
export function removeWindow(windowId) {
  return { type: ActionTypes.REMOVE_WINDOW, windowId }
}

/**
 * toggleWindowSideBar - action creator
 *
 * @param  {String} windowId
 * @memberof ActionCreators
 */
export function toggleWindowSideBar(windowId) {
  return { type: ActionTypes.TOGGLE_WINDOW_SIDE_BAR, windowId }
}

/**
 * toggleWindowSideBarPanel - action creator
 *
 * @param  {String} windowId
 * @param  {String} panelType
 * @memberof ActionCreators
 */
export function setWindowSideBarPanel(windowId, panelType) {
  return { type: ActionTypes.SET_WINDOW_SIDE_BAR_PANEL, windowId, panelType };
}

/**
 *
 * @param windowId
 */
export function closeWindow(windowId) {
  return (dispatch, getState) => {
    const { companionWindowIds } = getState().windows[windowId];
    companionWindowIds.map((id) => dispatch(removeCompanionWindow(id)));
    dispatch(removeWindow(windowId));
  };
}

/**
 * setWindowThumbnailPosition - action creator
 *
 * @param  {String} windowId
 * @param  {String} position
 * @memberof ActionCreators
 */
export function setWindowThumbnailPosition(windowId, position) {
  return { type: ActionTypes.SET_WINDOW_THUMBNAIL_POSITION, windowId, position };
}

/**
 * setWindowViewType - action creator
 *
 * @param  {String} windowId
 * @param  {String} viewType
 * @memberof ActionCreators
 */
export function setWindowViewType(windowId, viewType) {
  return { type: ActionTypes.SET_WINDOW_VIEW_TYPE, windowId, viewType };
}

/**
 * updateWindowPosition - action creator
 *
 * @param  {String} windowId
 * @param  {Array} position
 * @memberof ActionCreators
 */
export function updateWindowPosition(windowId, position) {
  return {
    payload: {
      position,
      windowId,
    },
    type: ActionTypes.UPDATE_WINDOW_POSITION,
  };
}

/**
 * setWindowSize - action creator
 *
 * @param  {String} windowId
 * @param  {Object} size
 * @memberof ActionCreators
 */
export function setWindowSize(windowId, size) {
  return {
    payload: {
      size,
      windowId,
    },
    type: ActionTypes.SET_WINDOW_SIZE,
  };
}
