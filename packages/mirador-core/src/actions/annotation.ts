import {
  DESELECT_ANNOTATION,
  RECEIVE_ANNOTATION,
  RECEIVE_ANNOTATION_FAILURE,
  REQUEST_ANNOTATION,
  SELECT_ANNOTATION,
  TOGGLE_ANNOTATION_DISPLAY
} from './action-types'
import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

/**
 * requestAnnotation - action creator
 *
 * @param  {String} canvasId
 * @param  {String} annotationId
 * @memberof ActionCreators
 */
export const requestAnnotation = actionCreator<{annotationId, canvasId}>(REQUEST_ANNOTATION)

/**
 * receiveAnnotation - action creator
 *
 * @param  {String} canvasId
 * @param  {String} annotationId
 * @param  {Object} annotationJson
 * @memberof ActionCreators
 */
export const receiveAnnotation = actionCreator<{annotationId, annotationJson, canvasId}>(RECEIVE_ANNOTATION)

/**
 * receiveAnnotationFailure - action creator
 *
 * @param  {String} canvasId
 * @param  {String} annotationId
 * @param  {String} error
 * @memberof ActionCreators
 */
export const receiveAnnotationFailure = actionCreator<{annotationId, canvasId, error}>(RECEIVE_ANNOTATION_FAILURE)



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
