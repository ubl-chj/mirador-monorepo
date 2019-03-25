import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createDebounce from 'redux-debounced'
import { rootReducer } from './reducers/'
import thunkMiddleware from 'redux-thunk'


/**
 *
 */
export const newStore = (): any => {
  return createStore(rootReducer(),
    composeWithDevTools(
      applyMiddleware(
        createDebounce(),
        thunkMiddleware)
    )
  )
}
