import {ActionTypes} from './action-types';

/**
 *
 * @param manifestId
 * @param properties
 */
export function requestManifest(manifestId, properties) {
  return {
    manifestId,
    properties,
    type: ActionTypes.REQUEST_MANIFEST,
  };
}

/**
 * receiveManifest - action creator
 *
 * @param  {String} manifestId
 * @param  {Object} manifestJson
 * @memberof ActionCreators
 */
export function receiveManifest(manifestId, manifestJson) {
  return {
    manifestId,
    manifestJson,
    type: ActionTypes.RECEIVE_MANIFEST,
  };
}

/**
 *
 * @param manifestId
 * @param error
 */
export function receiveManifestFailure(manifestId, error) {
  return {
    error,
    manifestId,
    type: ActionTypes.RECEIVE_MANIFEST_FAILURE,
  };
}

/**
 *
 * @param manifestId
 * @param properties
 */
export function fetchManifest(manifestId, properties) {
  return ((dispatch) => {
    dispatch(requestManifest(manifestId, { ...properties, isFetching: true }));

    return fetch(manifestId)
      .then((response) => response.json())
      .then((json) => dispatch(receiveManifest(manifestId, json)))
      .catch((error) => {
        if (typeof error === 'object') { // Returned by JSON parse failure
          dispatch(receiveManifestFailure(manifestId, String(error)));
        } else {
          dispatch(receiveManifestFailure(manifestId, error));
        }
      });
  });
}

/**
 * removeManifest - action creator
 *
 * @param  {String} manifestId
 * @memberof ActionCreators
 */
export function removeManifest(manifestId) {
  return { manifestId, type: ActionTypes.REMOVE_MANIFEST };
}
