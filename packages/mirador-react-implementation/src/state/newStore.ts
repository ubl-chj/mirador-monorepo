import { AnyAction, applyMiddleware, createStore } from 'redux'
import thunkMiddleware, { ThunkMiddleware } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer } from './reducers/'

const thunk: ThunkMiddleware<{}, AnyAction> = thunkMiddleware;

/**
 *
 */
export const newStore = (): any => {
  return createStore(
    rootReducer(),
    composeWithDevTools(
      applyMiddleware(
        thunk
      )
    )
  )
}

