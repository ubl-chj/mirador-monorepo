import {RECEIVE_INFO_RESPONSE, RECEIVE_INFO_RESPONSE_FAILURE, REMOVE_INFO_RESPONSE, REQUEST_INFO_RESPONSE} from './action-types'

/**
 * requestInfoResponse - action creator
 *
 * @param  {String} infoId
 * @memberof ActionCreators
 */
export const requestInfoResponse = (infoId) => {
  return {
    infoId,
    type: REQUEST_INFO_RESPONSE,
  }
}

/**
 *
 * @param infoId
 * @param infoJson
 */
export const receiveInfoResponse = (infoId, infoJson) => {
  return {
    infoId,
    infoJson,
    type: RECEIVE_INFO_RESPONSE,
  }
}

/**
 * receiveInfoResponseFailure - action creator
 *
 * @param  {String} infoId
 * @param  {String} error
 * @memberof ActionCreators
 */
export const receiveInfoResponseFailure = (infoId, error) => {
  return {
    error,
    infoId,
    type: RECEIVE_INFO_RESPONSE_FAILURE,
  }
}

/**
 * removeInfoResponse - action creator
 *
 * @param  {String} infoId
 * @memberof ActionCreators
 */
export const removeInfoResponse = (infoId) => {
  return { infoId, type: REMOVE_INFO_RESPONSE };
}
