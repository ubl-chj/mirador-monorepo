import * as actions from '@mirador/actions';
import createStore from './state/createStore';

const store = createStore();
export { store, actions };
