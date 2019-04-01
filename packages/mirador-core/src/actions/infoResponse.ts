import {REMOVE_INFO_RESPONSE} from './action-types'

/**
 * removeInfoResponse - action creator
 *
 * @param  {String} infoId
 * @memberof ActionCreators
 */
export const removeInfoResponse = (infoId) => {
  return { infoId, type: REMOVE_INFO_RESPONSE };
}
