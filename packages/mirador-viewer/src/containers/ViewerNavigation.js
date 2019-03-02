import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '@mirador/core';
import { ViewerNavigation } from '../components/ViewerNavigation';

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestForm
 * @private
 */
const mapDispatchToProps = {
  setCanvas: actions.setCanvas,
};

const enhance = compose(
  connect(null, mapDispatchToProps),
);

export default enhance(ViewerNavigation);
