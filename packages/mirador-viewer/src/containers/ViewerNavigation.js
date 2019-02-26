import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '@mirador/core';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import { ViewerNavigation } from '../components/ViewerNavigation';

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestForm
 * @private
 */
const mapDispatchToProps = {
  nextCanvas: actions.nextCanvas,
  previousCanvas: actions.previousCanvas,
};

const enhance = compose(
  connect(null, mapDispatchToProps),
  miradorWithPlugins,
  // further HOC go here
);

export default enhance(ViewerNavigation);
