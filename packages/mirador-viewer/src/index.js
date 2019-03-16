import init from './init';
import App from './components/App';
import * as actions from '@mirador/core';
import * as selectors from './state/selectors';

export * from './components';

const exports = {
  App,
  viewer: init,
  actions,
  selectors,
};

export default exports;
