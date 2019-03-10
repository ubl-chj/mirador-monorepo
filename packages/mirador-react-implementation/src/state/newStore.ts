import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer } from './reducers/'
import thunkMiddleware from 'redux-thunk'

/**
 *
 */
export const newStore = (): any => {
  return createStore(rootReducer(), composeWithDevTools(applyMiddleware(thunkMiddleware)))
}
