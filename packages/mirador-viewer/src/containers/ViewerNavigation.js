import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '@mirador/core';
import { withTranslation } from 'react-i18next';
import { ViewerNavigation } from '../components/ViewerNavigation';
import { withPlugins } from '../extend';

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestForm
 * @private
 */
const mapDispatchToProps = {
  setCanvas: actions.setCanvas,
};

const enhance = compose(
  withTranslation(),
  connect(null, mapDispatchToProps),
  withPlugins('ViewerNavigation'),
);

export default enhance(ViewerNavigation);
