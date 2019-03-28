import {MAXIMIZE_WINDOW, MINIMIZE_WINDOW, SET_WINDOW_SIDE_BAR_PANEL, SET_WINDOW_SIZE, SET_WINDOW_VIEW_TYPE,
  TOGGLE_WINDOW_SIDE_BAR, UPDATE_WINDOW, UPDATE_WINDOW_POSITION} from './action-types';
import {createAction} from 'typesafe-actions';

/**
 * maximizeWindow
 * @param  {String} windowId
 * @memberof ActionCreators
 */
export const maximizeWindow = createAction(MAXIMIZE_WINDOW, action => {
  return (windowId) => action({windowId});
})

/**
 * minimizeWindow
 * @param  {String} windowId
 * @memberof ActionCreators
 */
export const minimizeWindow = createAction(MINIMIZE_WINDOW, action => {
  return (windowId) => action({windowId});
})

/** */
export const updateWindow = createAction(UPDATE_WINDOW, action => {
  return (id: string) => action({id});
})

/** */
export const setCompanionAreaOpen = createAction(UPDATE_WINDOW, action => {
  return (id, companionAreaOpen) => action({companionAreaOpen, id});
})



/**
 * toggleWindowSideBar - action creator
 *
 * @param  {String} windowId
 * @memberof ActionCreators
 */
export const toggleWindowSideBar = createAction(TOGGLE_WINDOW_SIDE_BAR, action => {
  return (windowId) => action({windowId});
})

/**
 * setWindowSideBarPanel - action creator
 *
 * @param  {String} windowId
 * @param  {String} panelType
 * @memberof ActionCreators
 */
export const setWindowSideBarPanel = createAction(SET_WINDOW_SIDE_BAR_PANEL, action => {
  return (panelType, windowId) => action({panelType, windowId});
})



/**
 * setWindowViewType - action creator
 *
 * @param  {String} windowId
 * @param  {String} viewType
 * @memberof ActionCreators
 */
export const setWindowViewType = createAction(SET_WINDOW_VIEW_TYPE, action => {
  return (viewType, windowId) => action({viewType, windowId});
})

/**
 * updateWindowPosition - action creator
 *
 * @param  {String} windowId
 * @param  {Array} position
 * @memberof ActionCreators
 */
export const updateWindowPosition = createAction(UPDATE_WINDOW_POSITION, action => {
  return (position, windowId) => action({position, windowId});
})

/**
 * setWindowSize - action creator
 *
 * @param  {String} windowId
 * @param  {Object} size
 * @memberof ActionCreators
 */
export const setWindowSize = createAction(SET_WINDOW_SIZE, action => {
  return (size, windowId) => action({size, windowId})
})
