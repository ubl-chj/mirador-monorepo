import {ADD_COMPANION_WINDOW, REMOVE_COMPANION_WINDOW, UPDATE_COMPANION_WINDOW} from './action-types';
import {createAction} from 'typesafe-actions';

/**
 *
 */
export const addCompanionWindow = createAction(ADD_COMPANION_WINDOW, action => {
  return (content, position, id) => action({content, position, id});
})

/**
 *
 * @param windowId
 * @param id
 * @param payload
 */
export const updateCompanionWindow = createAction(UPDATE_COMPANION_WINDOW, action => {
  return (windowId, id, content, position,) => action({
    content,
    id,
    position,
    windowId,
  });
})

/** */
export const removeCompanionWindow = createAction(REMOVE_COMPANION_WINDOW, action => {
  return (windowId, id) => action({
    id,
    windowId,
  });
})
