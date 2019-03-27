import {DESELECT_ANNOTATION, RECEIVE_ANNOTATION, RECEIVE_ANNOTATION_FAILURE,
  REQUEST_ANNOTATION, SELECT_ANNOTATION, TOGGLE_ANNOTATION_DISPLAY} from './action-types'
import {createAction} from 'typesafe-actions';

/**
 * requestAnnotation - action creator
 *
 * @param  {String} canvasId
 * @param  {String} annotationId
 * @memberof ActionCreators
 */
export const requestAnnotation = createAction(REQUEST_ANNOTATION, action => {
  return (canvasId, annotationId) => action({
    annotationId,
    canvasId,
  });
})

/**
 * receiveAnnotation - action creator
 *
 * @param  {String} canvasId
 * @param  {String} annotationId
 * @param  {Object} annotationJson
 * @memberof ActionCreators
 */
export const receiveAnnotation = createAction(RECEIVE_ANNOTATION, action => {
  return (canvasId, annotationId, annotationJson) => action({
    annotationId,
    annotationJson,
    canvasId,
  });
})

/**
 * receiveAnnotationFailure - action creator
 *
 * @param  {String} canvasId
 * @param  {String} annotationId
 * @param  {String} error
 * @memberof ActionCreators
 */
export const receiveAnnotationFailure = createAction(RECEIVE_ANNOTATION_FAILURE, action => {
  return (canvasId, annotationId, error) => action({
    annotationId,
    canvasId,
    error
  });
})



/**
 * selectAnnotation - action creator
 *
 * @param  {String} windowId
 * @param  {String} canvasId
 * @param  {String} annotationId
 * @memberof ActionCreators
 */
export const selectAnnotation = createAction(SELECT_ANNOTATION, action => {
  return (windowId, canvasId, annotationId) => action({
    annotationId,
    canvasId,
    windowId,
  });
})

/**
 * deselectAnnotation - action creator
 *
 * @param  {String} windowId
 * @param  {String} canvasId
 * @param  {String} annotationId
 * @memberof ActionCreators
 */
export const deselectAnnotation = createAction(DESELECT_ANNOTATION, action => {
  return (windowId, canvasId, annotationId) => action({
    annotationId,
    canvasId,
    windowId,
  });
})

/**
 * toggleAnnotationDisplay - action creator
 *
 * @param  {String} windowId
 * @memberof ActionCreators
 */
export const toggleAnnotationDisplay = createAction(TOGGLE_ANNOTATION_DISPLAY, action => {
  return (windowId) => action({windowId});
})
