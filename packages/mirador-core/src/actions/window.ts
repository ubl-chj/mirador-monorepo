import {
  ADD_WINDOW,
  MAXIMIZE_WINDOW,
  MINIMIZE_WINDOW,
  REMOVE_WINDOW,
  SET_WINDOW_SIDE_BAR_PANEL,
  SET_WINDOW_SIZE,
  SET_WINDOW_VIEW_TYPE,
  TOGGLE_WINDOW_SIDE_BAR,
  UPDATE_COMPANION_WINDOW,
  UPDATE_VIEWPORT,
  UPDATE_WINDOW,
  UPDATE_WINDOW_POSITION
} from './action-types';
import {ICompanionWindow} from 'mirador-core-model'
import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

/**
 * addWindow
 * @param  {String} windowId
 * @memberof ActionCreators
 */
export const addWindow = actionCreator<{companionWindows: ICompanionWindow, window?: any}>(ADD_WINDOW)

/**
 * maximizeWindow
 * @param  {String} windowId
 * @memberof ActionCreators
 */
export const maximizeWindow = actionCreator<{windowId: string}>(MAXIMIZE_WINDOW)

/**
 * minimizeWindow
 * @param  {String} windowId
 * @memberof ActionCreators
 */
export const minimizeWindow = actionCreator<{windowId: string}>(MINIMIZE_WINDOW)

/** */
export const updateWindow = actionCreator<{id}>(UPDATE_WINDOW)

/** */
export const setCompanionAreaOpen = actionCreator<{companionAreaOpen, id}>(UPDATE_COMPANION_WINDOW)


/**
 * removeWindow
 * @param  {String} windowId
 * @memberof ActionCreators
 */
export const removeWindow = actionCreator<{companionWindowIds: any, id: string}>(REMOVE_WINDOW)

/**
 * toggleWindowSideBar - action creator
 *
 * @param  {String} windowId
 * @memberof ActionCreators
 */
export const toggleWindowSideBar = actionCreator<{windowId: string}>(TOGGLE_WINDOW_SIDE_BAR)

/**
 * setWindowSideBarPanel - action creator
 *
 * @param  {String} windowId
 * @param  {String} panelType
 * @memberof ActionCreators
 */
export const setWindowSideBarPanel = actionCreator<{panelType, windowId}>(SET_WINDOW_SIDE_BAR_PANEL)



/**
 * setWindowViewType - action creator
 *
 * @param  {String} windowId
 * @param  {String} viewType
 * @memberof ActionCreators
 */
export const setWindowViewType = actionCreator<{viewType, windowId}>(SET_WINDOW_VIEW_TYPE)

/**
 * updateWindowPosition - action creator
 *
 * @param  {String} windowId
 * @param  {Array} position
 * @memberof ActionCreators
 */
export const updateWindowPosition = actionCreator<{position, windowId}>(UPDATE_WINDOW_POSITION)

/**
 * setWindowSize - action creator
 *
 * @param  {String} windowId
 * @param  {Object} size
 * @memberof ActionCreators
 */
export const setWindowSize = actionCreator<{size, windowId}>(SET_WINDOW_SIZE)

/**
 *
 * @param windowId
 * @param payload
 * @returns {{payload: *, meta: {debounce: {time: number}}, type: string, windowId: *}}
 */
export const updateViewport = actionCreator<{x, y, windowId, zoom}>(UPDATE_VIEWPORT, {debounce: {time: 100}})
