import {fetchAnnotation} from "../actions"
import {reducerWithInitialState} from 'typescript-fsa-reducers'

/**
 * annotationReducer
 */
export const annotations = reducerWithInitialState({})
  .case(fetchAnnotation.started, state => ({
    ...state,
    updating: true
  }))
  .caseWithAction(fetchAnnotation.done, (state, action) => ({
    ...state,
    [action.payload.params.canvasId]: {
      [action.payload.params.annotationId]: {
        id: action.payload.params.annotationId,
        json: action.payload.result,
      },
    },
    updating: false
  }))
  .case(fetchAnnotation.failed, (state, { error }) => ({
    ...state,
    error,
    updating: false
  }))
