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
 * @param i18n
 * @returns {*}
 * @constructor
 */
export const MiradorComponent = ({ store, plugins, i18n }) => {
  storePlugins(plugins);
  return (<Provider store={store}><App i18n={i18n} /></Provider>);
};

/**
 *
 * @param store
 * @returns {*}
 * @constructor
 */
export const MenuButton = ({ store }) => <Provider store={store}><WorkspaceMenuButton /></Provider>;

MiradorComponent.propTypes = {
  i18n: PropTypes.object, // eslint-disable-line
  plugins: PropTypes.object, // eslint-disable-line
  store: PropTypes.object, // eslint-disable-line
};

MenuButton.propTypes = {
  store: PropTypes.object, // eslint-disable-line
};
