import {
  DESELECT_ANNOTATION,
  SELECT_ANNOTATION,
  TOGGLE_ANNOTATION_DISPLAY
} from './action-types'
import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

/**
 * selectAnnotation - action creator
 *
 * @param  {String} windowId
 * @param  {String} canvasId
 * @param  {String} annotationId
 * @memberof ActionCreators
 */
export const selectAnnotation = actionCreator<{annotationId, canvasId, windowId}>(SELECT_ANNOTATION)

/**
 * deselectAnnotation - action creator
 *
 * @param  {String} windowId
 * @param  {String} canvasId
 * @param  {String} annotationId
 * @memberof ActionCreators
 */
export const deselectAnnotation = actionCreator<{annotationId, canvasId, windowId}>(DESELECT_ANNOTATION)

/**
 * toggleAnnotationDisplay - action creator
 *
 * @param  {String} windowId
 * @memberof ActionCreators
 */
export const toggleAnnotationDisplay = actionCreator<{windowId}>(TOGGLE_ANNOTATION_DISPLAY)
