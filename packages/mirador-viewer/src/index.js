import init from './init';
import App from './components/App';

export * from './components';
export * from './state/actions';
export * from './state/reducers';

const exports = {
  App,
  viewer: init,
  plugins: {},
};

export default exports;
