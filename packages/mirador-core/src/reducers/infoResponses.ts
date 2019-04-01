import {fetchInfoResponse} from "../actions"
import {reducerWithInitialState} from 'typescript-fsa-reducers'

/**
 * infoResponseReducer
 */
export const infoResponses = reducerWithInitialState({})
  .case(fetchInfoResponse.started, state => ({
    ...state,
    updating: true
  }))
  .caseWithAction(fetchInfoResponse.done, (state, action: any) => ({
    ...state,
    [action.payload.params.infoId]: {
      id: action.payload.params.infoId,
      json: action.payload.result,
    },
    updating: false,
  }))
  .case(fetchInfoResponse.failed, (state, { error }) => ({
    ...state,
    error,
    updating: false,
  }))
