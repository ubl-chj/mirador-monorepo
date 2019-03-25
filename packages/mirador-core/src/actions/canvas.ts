import {SET_CANVAS, UPDATE_VIEWPORT} from './action-types';
/**
 * setCanvas - action creator
 *
 * @param  {String} windowId
 * @param  {Number} canvasIndex
 * @memberof ActionCreators
 */
export const setCanvas = (windowId, canvasIndex) => {
  return {
    canvasIndex,
    type: SET_CANVAS,
    windowId,
  };
}

/**
 *
 * @param windowId
 * @param payload
 * @returns {{payload: *, meta: {debounce: {time: number}}, type: string, windowId: *}}
 */
export const updateViewport = (windowId, payload) => {
  return {
    meta: {
      debounce: {
        // TODO : set this value in a registry
        time: 100,
      },
    },
    payload,
    type: UPDATE_VIEWPORT,
    windowId,
  };
}
