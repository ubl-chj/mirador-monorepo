import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import App from './containers/App';
import { pluginStore } from '../src/extend';

export * from './components';

/**
 *
 * @param store
 * @param plugins
 * @param i18n
 * @returns {*}
 * @constructor
 */
export const MiradorComponent = ({ store, plugins }) => {
  pluginStore.storePlugins(plugins);
  return (<Provider store={store}><App/></Provider>);
};

MiradorComponent.propTypes = {
  plugins: PropTypes.object, // eslint-disable-line
  store: PropTypes.object, // eslint-disable-line
};
