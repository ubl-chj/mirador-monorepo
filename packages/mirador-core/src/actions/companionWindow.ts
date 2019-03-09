import uuid from 'uuid/v4';
import {ActionTypes} from './action-types';
import { updateWindow } from './window';

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
export function addCompanionWindow(windowId, payload, defaults = defaultProps) {
  return (dispatch, getState) => {
    const { companionWindows } = getState();
    const id = `cw-${uuid()}`;

    dispatch({
      companionWindows,
      id,
      payload: { ...defaults, ...payload, id },
      type: ActionTypes.ADD_COMPANION_WINDOW,
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
export function updateCompanionWindow(windowId, id, payload) {
  return {
    id,
    payload,
    type: ActionTypes.UPDATE_COMPANION_WINDOW,
    windowId,
  };
}

/**
 *
 * @param id
 */
export function removeCompanionWindow(id) {
  return { type: ActionTypes.REMOVE_COMPANION_WINDOW, id };
}

/**
 *
 * @param windowId
 * @param companionWindowId
 */
export function closeCompanionWindow(windowId, companionWindowId) {
  return (dispatch, getState) => {
    dispatch(removeCompanionWindow(companionWindowId));
    const companionWindowIds = getState().windows[windowId].companionWindowIds
      .filter((id) => id !== companionWindowId);
    dispatch(updateWindow(windowId, { companionWindowIds }));
  };
}
