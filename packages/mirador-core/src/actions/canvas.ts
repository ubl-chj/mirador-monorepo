import {SET_CANVAS} from './action-types';
import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

/**
 * setCanvas - action creator
 *
 * @param  {String} windowId
 * @param  {Number} canvasIndex
 * @memberof ActionCreators
 */
export const setCanvas = actionCreator<{canvasIndex: number, windowId: string}>(SET_CANVAS)


