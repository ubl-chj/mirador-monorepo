import {ActionTypes} from './action-types'

/**
 * requestInfoResponse - action creator
 *
 * @param  {String} infoId
 * @memberof ActionCreators
 */
export function requestInfoResponse(infoId) {
  return {
    infoId,
    type: ActionTypes.REQUEST_INFO_RESPONSE,
  }
}

/**
 *
 * @param infoId
 * @param infoJson
 */
export function receiveInfoResponse(infoId, infoJson) {
  return {
    infoId,
    infoJson,
    type: ActionTypes.RECEIVE_INFO_RESPONSE,
  }
}

/**
 * receiveInfoResponseFailure - action creator
 *
 * @param  {String} infoId
 * @param  {String} error
 * @memberof ActionCreators
 */
export function receiveInfoResponseFailure(infoId, error) {
  return {
    error,
    infoId,
    type: ActionTypes.RECEIVE_INFO_RESPONSE_FAILURE,
  }
}

/**
 * fetchInfoResponse - action creator
 *
 * @param  {String} infoId
 * @memberof ActionCreators
 */
export function fetchInfoResponse(infoId) {
  return (dispatch) => {
    dispatch(requestInfoResponse(infoId))
    return window.fetch(infoId)
      .then((response) => response.json())
      .then((json) => dispatch(receiveInfoResponse(infoId, json)))
      .catch((error) => dispatch(receiveInfoResponseFailure(infoId, error)))
  }
}

/**
 * removeInfoResponse - action creator
 *
 * @param  {String} infoId
 * @memberof ActionCreators
 */
export function removeInfoResponse(infoId) {
  return { infoId, type: ActionTypes.REMOVE_INFO_RESPONSE };
}
