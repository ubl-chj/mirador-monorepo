import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import App from './containers/App';
import WorkspaceMenuButton from './containers/WorkspaceMenuButton';

export * from './components';

/**
 *
 * @param store
 * @returns {*}
 * @constructor
 */
export const MiradorComponent = ({ store }) => <Provider store={store}><App /></Provider>;

/**
 *
 * @param store
 * @returns {*}
 * @constructor
 */
export const MenuButton = ({ store }) => <Provider store={store}><WorkspaceMenuButton /></Provider>;

MiradorComponent.propTypes = {
  store: PropTypes.object, // eslint-disable-line
};

MenuButton.propTypes = {
  store: PropTypes.object, // eslint-disable-line
};
