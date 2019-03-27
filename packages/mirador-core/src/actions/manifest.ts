import {RECEIVE_MANIFEST, RECEIVE_MANIFEST_FAILURE, REMOVE_MANIFEST, REQUEST_MANIFEST} from './action-types';

/**
 *
 * @param manifestId
 * @param properties
 */
export const requestManifest = (manifestId, properties) => {
  return {
    manifestId,
    properties,
    type: REQUEST_MANIFEST,
  };
}

/**
 * receiveManifest - action creator
 *
 * @param  {String} manifestId
 * @param  {Object} manifestJson
 * @memberof ActionCreators
 */
export const receiveManifest = (manifestId, manifestJson) => {
  return {
    manifestId,
    manifestJson,
    type: RECEIVE_MANIFEST,
  };
}

/**
 *
 * @param manifestId
 * @param error
 */
export const receiveManifestFailure = (manifestId, error) => {
  return {
    error,
    manifestId,
    type: RECEIVE_MANIFEST_FAILURE,
  };
}

/**
 * removeManifest - action creator
 *
 * @param  {String} manifestId
 * @memberof ActionCreators
 */
export const removeManifest = (manifestId) => {
  return { manifestId, type: REMOVE_MANIFEST };
}
