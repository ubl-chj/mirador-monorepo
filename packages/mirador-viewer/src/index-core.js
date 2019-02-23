import * as actions from '@mirador/core';
import createStore from './state/createStore';

const store = createStore();
export { store, actions };
