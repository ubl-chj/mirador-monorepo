import {UPDATE_VIEWPORT} from "./action-types"
import actionCreatorFactory from 'typescript-fsa';
const actionCreator = actionCreatorFactory();

export const updateViewport = actionCreator<{x: number, y: number, windowId: string, zoom: number}>(UPDATE_VIEWPORT)
