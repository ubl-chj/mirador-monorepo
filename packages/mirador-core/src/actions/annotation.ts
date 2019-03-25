import {DESELECT_ANNOTATION, RECEIVE_ANNOTATION, RECEIVE_ANNOTATION_FAILURE,
  REQUEST_ANNOTATION, SELECT_ANNOTATION, TOGGLE_ANNOTATION_DISPLAY} from './action-types'

/**
 * requestAnnotation - action creator
 *
 * @param  {String} canvasId
 * @param  {String} annotationId
 * @memberof ActionCreators
 */
export const requestAnnotation = (canvasId, annotationId) => {
  return {
    annotationId,
    canvasId,
    type: REQUEST_ANNOTATION,
  };
}

/**
 * receiveAnnotation - action creator
 *
 * @param  {String} canvasId
 * @param  {String} annotationId
 * @param  {Object} annotationJson
 * @memberof ActionCreators
 */
export const receiveAnnotation = (canvasId, annotationId, annotationJson) => {
  return {
    annotationId,
    annotationJson,
    canvasId,
    type: RECEIVE_ANNOTATION,
  };
}

/**
 * receiveAnnotationFailure - action creator
 *
 * @param  {String} canvasId
 * @param  {String} annotationId
 * @param  {String} error
 * @memberof ActionCreators
 */
export const receiveAnnotationFailure = (canvasId, annotationId, error) => {
  return {
    annotationId,
    canvasId,
    error,
    type: RECEIVE_ANNOTATION_FAILURE,
  };
}

/**
 * fetchAnnotation - action creator
 *
 * @param  {String} annotationId
 * @memberof ActionCreators
 */
export const fetchAnnotation = (canvasId, annotationId) => {
  return ((dispatch) => {
    dispatch(requestAnnotation(canvasId, annotationId));
    return window.fetch(annotationId)
      .then((response) => response.json())
      .then((json) => dispatch(receiveAnnotation(canvasId, annotationId, json)))
      .catch((error) => dispatch(receiveAnnotationFailure(canvasId, annotationId, error)));
  });
}

/**
 * selectAnnotation - action creator
 *
 * @param  {String} windowId
 * @param  {String} canvasId
 * @param  {String} annotationId
 * @memberof ActionCreators
 */
export const selectAnnotation = (windowId, canvasId, annotationId) => {
  return {
    annotationId,
    canvasId,
    type: SELECT_ANNOTATION,
    windowId,
  };
}

/**
 * deselectAnnotation - action creator
 *
 * @param  {String} windowId
 * @param  {String} canvasId
 * @param  {String} annotationId
 * @memberof ActionCreators
 */
export const deselectAnnotation = (windowId, canvasId, annotationId) => {
  return {
    annotationId,
    canvasId,
    type: DESELECT_ANNOTATION,
    windowId,
  };
}

/**
 * toggleAnnotationDisplay - action creator
 *
 * @param  {String} windowId
 * @memberof ActionCreators
 */
export const toggleAnnotationDisplay = (windowId) => {
  return {
    type: TOGGLE_ANNOTATION_DISPLAY, windowId,
  };
}
