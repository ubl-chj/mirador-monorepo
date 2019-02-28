import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import App from './containers/App';
import WorkspaceMenuButton from './containers/WorkspaceMenuButton';
import { storePlugins } from './extend';

export * from './components';

/**
 *
 * @param store
 * @param plugins
 * @returns {*}
 * @constructor
 */
export const MiradorComponent = ({ store, plugins }) => {
  storePlugins(plugins);
  return (<Provider store={store}><App /></Provider>);
};

/**
 *
 * @param store
 * @returns {*}
 * @constructor
 */
export const MenuButton = ({ store }) => <Provider store={store}><WorkspaceMenuButton /></Provider>;

MiradorComponent.propTypes = {
  plugins: PropTypes.object, // eslint-disable-line
  store: PropTypes.object, // eslint-disable-line
};

MenuButton.propTypes = {
  store: PropTypes.object, // eslint-disable-line
};
