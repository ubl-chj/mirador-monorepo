import {REMOVE_MANIFEST} from './action-types';
/**
 * removeManifest - action creator
 *
 * @param  {String} manifestId
 * @memberof ActionCreators
 */
export const removeManifest = (manifestId) => {
  return { manifestId, type: REMOVE_MANIFEST };
}
