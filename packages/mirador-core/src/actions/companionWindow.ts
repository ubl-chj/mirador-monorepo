import {ADD_COMPANION_WINDOW, REMOVE_COMPANION_WINDOW, UPDATE_COMPANION_WINDOW} from './action-types';
import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

/**
 *
 */
export const addCompanionWindow = actionCreator<{content, position, id}>(ADD_COMPANION_WINDOW)

/**
 *
 * @param windowId
 * @param id
 * @param payload
 */
export const updateCompanionWindow = actionCreator<{windowId, id, content, position}>(UPDATE_COMPANION_WINDOW)

/** */
export const removeCompanionWindow = actionCreator<{companionWindowIds, id}>(REMOVE_COMPANION_WINDOW)
