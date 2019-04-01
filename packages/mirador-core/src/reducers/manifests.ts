import {fetchManifest} from "../actions"
import {reducerWithInitialState} from 'typescript-fsa-reducers'

/**
 * manifestsReducer
 */
export const manifests = reducerWithInitialState({})
  .case(fetchManifest.started, state => ({
    ...state,
    updating: true
  }))
  .caseWithAction(fetchManifest.done, (state, action: any) => ({
    ...state,
    [action.payload.params.manifestId]: {
      id: action.payload.params.manifestId,
      json: action.payload.result,
      updating: false,
    },
    updating: false,
  }))
  .case(fetchManifest.failed, (state, { error }) => ({
    ...state,
    error,
    updating: false,
  }))
