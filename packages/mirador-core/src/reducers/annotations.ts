import * as annotationActions from "../actions/annotation"
import {ActionType, getType} from "typesafe-actions"

export type AnnotationAction = ActionType<typeof annotationActions>
/**
 * annotationReducer
 */
export const annotationsReducer = (state = {}, action: AnnotationAction) => {
  switch (action.type) {
    case getType(annotationActions.requestAnnotation):
      return {
        ...state,
        [action.payload.canvasId]: {
          [action.payload.annotationId]: {
            id: action.payload.annotationId,
            isFetching: true,
          },
        },
      };
    case getType(annotationActions.receiveAnnotation):
      return {
        ...state,
        [action.payload.canvasId]: {
          [action.payload.annotationId]: {
            id: action.payload.annotationId,
            isFetching: false,
            json: action.payload.annotationJson,
          },
        },
      };
    case getType(annotationActions.receiveAnnotationFailure):
      return {
        ...state,
        [action.payload.canvasId]: {
          [action.payload.annotationId]: {
            error: action.payload.error,
            id: action.payload.annotationId,
            isFetching: false,
          },
        },
      };
    default: return state;
  }
};
