import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { rootReducer } from './reducers/'

/**
 *
 * @param pluginReducers
 */
export const newStore = (pluginReducers) => {
  return createStore(rootReducer(pluginReducers), composeWithDevTools(applyMiddleware(thunkMiddleware)))
}
