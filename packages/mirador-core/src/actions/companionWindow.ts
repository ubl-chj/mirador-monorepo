import {ADD_COMPANION_WINDOW, REMOVE_COMPANION_WINDOW, UPDATE_COMPANION_WINDOW} from './action-types';
import uuid from 'uuid/v4';

const defaultProps = {
  content: null,
  position: null,
}

/**
 *
 * @param windowId
 * @param payload
 * @param defaults
 */
export const addCompanionWindow = (windowId, payload, defaults = defaultProps) => {
  return (dispatch, getState) => {
    const { companionWindows } = getState();
    const id = `cw-${uuid()}`;

    dispatch({
      companionWindows,
      id,
      payload: { ...defaults, ...payload, id },
      type: ADD_COMPANION_WINDOW,
      windowId,
    });
  };
}

/**
 *
 * @param windowId
 * @param id
 * @param payload
 */
export const updateCompanionWindow = (windowId, id, payload) => {
  return {
    id,
    payload,
    type: UPDATE_COMPANION_WINDOW,
    windowId,
  };
}

/** */
export const removeCompanionWindow = (windowId, id) => {
  return {
    id,
    type: REMOVE_COMPANION_WINDOW,
    windowId,
  };
}
