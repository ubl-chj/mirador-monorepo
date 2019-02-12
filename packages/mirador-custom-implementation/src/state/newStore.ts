import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { rootReducer } from './reducers/'

/**
 *
 * @param pluginReducers
 */
export const newStore = (pluginReducers) => {
  return createStore(rootReducer(pluginReducers), applyMiddleware(thunkMiddleware))
}
