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

import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

export const addWindow = actionCreator<{companionWindows: any, window?: any}>(ADD_WINDOW)

export const maximizeWindow = actionCreator<{id: string}>(MAXIMIZE_WINDOW)

export const minimizeWindow = actionCreator<{id: string}>(MINIMIZE_WINDOW)

export const updateWindow = actionCreator<{id: string}>(UPDATE_WINDOW)

export const setCompanionAreaOpen = actionCreator<{companionAreaOpen: boolean, id: string}>(UPDATE_COMPANION_WINDOW)

export const removeWindow = actionCreator<{id: string}>(REMOVE_WINDOW)

export const toggleWindowSideBar = actionCreator<{id: string}>(TOGGLE_WINDOW_SIDE_BAR)

export const setWindowSideBarPanel = actionCreator<{panelType: string, windowId: string}>(SET_WINDOW_SIDE_BAR_PANEL)

export const setWindowViewType = actionCreator<{viewType: string, windowId: string}>(SET_WINDOW_VIEW_TYPE)

export const updateWindowPosition = actionCreator<{position: {x: number, y: number}, windowId: string}>(UPDATE_WINDOW_POSITION)

export const setWindowSize = actionCreator<{size, windowId: string}>(SET_WINDOW_SIZE)

export const updateViewport = actionCreator<{x: number, y: number, windowId: string, zoom: number}>(UPDATE_VIEWPORT, {debounce: {time: 100}})
