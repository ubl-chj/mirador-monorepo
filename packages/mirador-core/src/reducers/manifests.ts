import {ActionTypes} from '../actions'
import omit from 'lodash/omit';

/**
 * manifestsReducer
 */
export const manifestsReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_MANIFEST:
      return {
        [action.manifestId]: {
          ...state[action.manifestId],
          ...action.properties,
          id: action.manifestId,
        },
        ...omit(state, action.manifestId),
      };
    case ActionTypes.RECEIVE_MANIFEST:
      return {
        ...state,
        [action.manifestId]: {
          ...state[action.manifestId],
          id: action.manifestId,
          json: action.manifestJson,
          isFetching: false,
          error: null, // Explicitly set the error to null in case this is a re-fetch
        },
      };
    case ActionTypes.RECEIVE_MANIFEST_FAILURE:
      return {
        ...state,
        [action.manifestId]: {
          ...state[action.manifestId],
          id: action.manifestId,
          error: action.error,
          isFetching: false,
        },
      };
    case ActionTypes.REMOVE_MANIFEST:
      return Object.keys(state).reduce((object, key) => {
        if (key !== action.manifestId) {
          object[key] = state[key]; // eslint-disable-line no-param-reassign
        }
        return object;
      }, {});
    default: return state;
  }
}
