import {fetchManifest} from "../actions"
import {reducerWithInitialState} from 'typescript-fsa-reducers'

/**
 * manifestsReducer
 */
export const manifests = reducerWithInitialState({})
  .case(fetchManifest.async.started, state => ({
    ...state,
    updating: true
  }))
  .caseWithAction(fetchManifest.async.done, (state, action) => ({
    ...state,
    [action.payload.params.manifestId]: {
      id: action.payload.params.manifestId,
      json: action.payload.result,
    },
    updating: false,
  }))
  .case(fetchManifest.async.failed, (state, { error }) => ({
    ...state,
    error,
    updating: false,
  }))
