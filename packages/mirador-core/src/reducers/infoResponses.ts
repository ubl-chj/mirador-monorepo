import {fetchInfoResponse} from "../actions"
import {reducerWithInitialState} from 'typescript-fsa-reducers'

/**
 * infoResponseReducer
 */
export const infoResponses = reducerWithInitialState({})
  .case(fetchInfoResponse.async.started, state => ({
    ...state,
    updating: true
  }))
  .caseWithAction(fetchInfoResponse.async.done, (state, action) => ({
    ...state,
    [action.payload.params.infoId]: {
      id: action.payload.params.infoId,
      json: action.payload.result,
    },
    updating: false,
  }))
  .case(fetchInfoResponse.async.failed, (state, { error }) => ({
    ...state,
    error,
    updating: false,
  }))
