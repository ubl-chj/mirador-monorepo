import {RECEIVE_INFO_RESPONSE, RECEIVE_INFO_RESPONSE_FAILURE, REMOVE_INFO_RESPONSE, REQUEST_INFO_RESPONSE} from '../actions'

/**
 * infoResponsesReducer
 */
export const infoResponsesReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_INFO_RESPONSE:
      return {
        ...state,
        [action.infoId]: {
          id: action.infoId,
          isFetching: true,
        },
      };
    case RECEIVE_INFO_RESPONSE:
      return {
        ...state,
        [action.infoId]: {
          id: action.infoId,
          isFetching: false,
          json: action.infoJson,
        },
      };
    case RECEIVE_INFO_RESPONSE_FAILURE:
      return {
        ...state,
        [action.infoId]: {
          error: action.error,
          id: action.infoId,
          isFetching: false,
        },
      };
    case REMOVE_INFO_RESPONSE:
      return Object.keys(state).reduce((object, key) => {
        if (key !== action.infoId) {
          object[key] = state[key]; // eslint-disable-line no-param-reassign
        }
        return object;
      }, {});
    default: return state;
  }
};
