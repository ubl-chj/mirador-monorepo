import {ActionTypes} from '../actions'

/**
 * annotationReducer
 */
export const annotationsReducer = (state = {}, action) => {
  switch (action.type) {
  case ActionTypes.REQUEST_ANNOTATION:
    return {
      ...state,
      [action.canvasId]: {
        [action.annotationId]: {
          id: action.annotationId,
          isFetching: true,
        },
      },
    };
  case ActionTypes.RECEIVE_ANNOTATION:
    return {
      ...state,
      [action.canvasId]: {
        [action.annotationId]: {
          id: action.annotationId,
          isFetching: false,
          json: action.annotationJson,
        },
      },
    };
  case ActionTypes.RECEIVE_ANNOTATION_FAILURE:
    return {
      ...state,
      [action.canvasId]: {
        [action.annotationId]: {
          error: action.error,
          id: action.annotationId,
          isFetching: false,
        },
      },
    };
  default: return state;
  }
};
