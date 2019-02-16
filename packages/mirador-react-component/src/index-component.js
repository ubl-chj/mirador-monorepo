import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import App from './containers/App';

export * from './state/actions';
export * from './state/reducers';

/**
 *
 * @param store
 * @returns {*}
 * @constructor
 */
export const MiradorComponent = ({ store }) => <Provider store={store}><App /></Provider>;

MiradorComponent.defaultProps = {
  store: null,
};

MiradorComponent.propTypes = {
  store: PropTypes.object, // eslint-disable-line
};
