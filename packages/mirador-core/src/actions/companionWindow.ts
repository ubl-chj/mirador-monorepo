import {REMOVE_COMPANION_WINDOW, UPDATE_COMPANION_WINDOW} from './action-types';
import {createAction} from 'typesafe-actions';

/**
 *
 * @param windowId
 * @param id
 * @param payload
 */
export const updateCompanionWindow = createAction(UPDATE_COMPANION_WINDOW, action => {
  return (windowId, id, payload) => action({
    id,
    ...payload,
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
