import {RECEIVE_MANIFEST, RECEIVE_MANIFEST_FAILURE, REMOVE_MANIFEST, REQUEST_MANIFEST} from '../actions'
import {IManifest} from 'mirador-core-model'
import omit from 'lodash/omit';

const initialState: IManifest = {}

/**
 * manifestsReducer
 */
export const manifests = (state: IManifest = initialState, action) => {
  switch (action.type) {
    case REQUEST_MANIFEST:
      return {
        [action.manifestId]: {
          ...state[action.manifestId],
          ...action.properties,
          id: action.manifestId,
        },
        ...omit(state, action.manifestId),
      };
    case RECEIVE_MANIFEST:
      return {
        ...state,
        [action.manifestId]: {
          ...state[action.manifestId],
          error: null, // Explicitly set the error to null in case this is a re-fetch
          id: action.manifestId,
          isFetching: false,
          json: action.manifestJson,
        },
      };
    case RECEIVE_MANIFEST_FAILURE:
      return {
        ...state,
        [action.manifestId]: {
          ...state[action.manifestId],
          error: action.error,
          id: action.manifestId,
          isFetching: false,
        },
      };
    case REMOVE_MANIFEST:
      return Object.keys(state).reduce((object, key) => {
        if (key !== action.manifestId) {
          object[key] = state[key]; // eslint-disable-line no-param-reassign
        }
        return object;
      }, {});
    default: return state;
  }
}
