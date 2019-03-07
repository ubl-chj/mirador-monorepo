import {ActionTypes} from './action-types'

/**
 * requestAnnotation - action creator
 *
 * @param  {String} canvasId
 * @param  {String} annotationId
 * @memberof ActionCreators
 */
export function requestAnnotation(canvasId, annotationId) {
  return {
    annotationId,
    canvasId,
    type: ActionTypes.REQUEST_ANNOTATION,
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
export function receiveAnnotation(canvasId, annotationId, annotationJson) {
  return {
    annotationId,
    annotationJson,
    canvasId,
    type: ActionTypes.RECEIVE_ANNOTATION,
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
export function receiveAnnotationFailure(canvasId, annotationId, error) {
  return {
    annotationId,
    canvasId,
    error,
    type: ActionTypes.RECEIVE_ANNOTATION_FAILURE,
  };
}

/**
 * fetchAnnotation - action creator
 *
 * @param  {String} annotationId
 * @memberof ActionCreators
 */
export function fetchAnnotation(canvasId, annotationId) {
  return ((dispatch) => {
    dispatch(requestAnnotation(canvasId, annotationId));
    return window.fetch(annotationId)
      .then((response) => response.json())
      .then((json) => dispatch(receiveAnnotation(canvasId, annotationId, json)))
      .catch((error) => dispatch(receiveAnnotationFailure(canvasId, annotationId, error)));
  });
}