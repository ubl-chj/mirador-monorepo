import {SET_CANVAS, UPDATE_VIEWPORT} from './action-types';
import {createAction} from 'typesafe-actions';

/**
 * setCanvas - action creator
 *
 * @param  {String} windowId
 * @param  {Number} canvasIndex
 * @memberof ActionCreators
 */
export const setCanvas = createAction(SET_CANVAS, action => {
  return (windowId, canvasIndex) => action({
    canvasIndex,
    windowId,
  });
})

/**
 *
 * @param windowId
 * @param payload
 * @returns {{payload: *, meta: {debounce: {time: number}}, type: string, windowId: *}}
 */
export const updateViewport = createAction(UPDATE_VIEWPORT, action => {
  return (windowId, payload) => action({
    meta: {
      debounce: {
        // TODO : set this value in a registry
        time: 100,
      },
    },
    ...payload,
    windowId,
  });
})
