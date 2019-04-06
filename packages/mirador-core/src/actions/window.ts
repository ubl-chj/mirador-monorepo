import {
  ADD_WINDOW, FOCUS_WINDOW,
  MAXIMIZE_WINDOW,
  MINIMIZE_WINDOW,
  REMOVE_WINDOW,
  SET_WINDOW_SIDE_BAR_PANEL,
  SET_WINDOW_SIZE, SET_WINDOW_THUMBNAIL_POSITION,
  SET_WINDOW_VIEW_TYPE,
  TOGGLE_WINDOW_SIDE_BAR,
  UPDATE_WINDOW,
  UPDATE_WINDOW_POSITION
} from './action-types';

import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

export const addWindow = actionCreator<{companionWindows: any, window?: any}>(ADD_WINDOW)

export const focusWindow = actionCreator<{position, windowId: string}>(FOCUS_WINDOW)

export const maximizeWindow = actionCreator<{id: string}>(MAXIMIZE_WINDOW)

export const minimizeWindow = actionCreator<{id: string}>(MINIMIZE_WINDOW)

export const updateWindow = actionCreator<{id: string}>(UPDATE_WINDOW)

export const setCompanionAreaOpen = actionCreator<{companionAreaOpen: boolean, id: string}>('SET_COMPANION_AREA_OPEN')

export const removeWindow = actionCreator<{id: string}>(REMOVE_WINDOW)

export const toggleWindowSideBar = actionCreator<{id: string}>(TOGGLE_WINDOW_SIDE_BAR)

export const setWindowSideBarPanel = actionCreator<{panelType: string, windowId: string}>(SET_WINDOW_SIDE_BAR_PANEL)

export const setWindowViewType = actionCreator<{viewType: string, windowId: string}>(SET_WINDOW_VIEW_TYPE)

export const updateWindowPosition = actionCreator<{position: {x: number, y: number}, windowId: string}>(UPDATE_WINDOW_POSITION)

export const setWindowSize = actionCreator<{size: {x: number, y: number, height: number, width: number}, windowId: string}>(SET_WINDOW_SIZE)


