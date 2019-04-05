import {ADD_COMPANION_WINDOW, REMOVE_COMPANION_WINDOW, UPDATE_COMPANION_WINDOW} from './action-types';
import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

export const addCompanionWindow = actionCreator<{content: string, position: string, id: string}>(ADD_COMPANION_WINDOW)

export const updateCompanionWindow = actionCreator<{windowId?: string, id: string, content?: string, position: string}>(UPDATE_COMPANION_WINDOW)

export const removeCompanionWindow = actionCreator<{id: string, windowId: string}>(REMOVE_COMPANION_WINDOW)
