import init from './init';
import App from './components/App';
import * as actions from '@mirador/core';
import * as selectors from './state/selectors';

export * from './components';

const exports = {
  actions,
  App,
  selectors,
  viewer: init,
};

export default exports;
