import {SET_CANVAS} from './action-types';
import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

export const setCanvas = actionCreator<{canvasIndex: number, windowId: string}>(SET_CANVAS)


