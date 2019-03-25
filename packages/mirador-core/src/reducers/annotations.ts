import {RECEIVE_ANNOTATION, RECEIVE_ANNOTATION_FAILURE, REQUEST_ANNOTATION} from '../actions'

/**
 * annotationReducer
 */
export const annotationsReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_ANNOTATION:
      return {
        ...state,
        [action.canvasId]: {
          [action.annotationId]: {
            id: action.annotationId,
            isFetching: true,
          },
        },
      };
    case RECEIVE_ANNOTATION:
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
    case RECEIVE_ANNOTATION_FAILURE:
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
