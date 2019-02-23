import { compose } from 'redux';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import * as actions from '@mirador/core';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import WorkspaceMenu from '../components/WorkspaceMenu';

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = { toggleZoomControls: actions.toggleZoomControls };

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowViewer
 * @private
 */
const mapStateToProps = state => (
  { showZoomControls: state.workspace.showZoomControls }
);

const enhance = compose(
  withNamespaces(),
  connect(mapStateToProps, mapDispatchToProps),
  miradorWithPlugins,
);

export default enhance(WorkspaceMenu);
