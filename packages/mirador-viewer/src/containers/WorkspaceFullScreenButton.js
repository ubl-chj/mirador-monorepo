import { connect } from 'react-redux';
import { compose } from 'redux';
import { withNamespaces } from 'react-i18next';
import * as actions from '@mirador/actions';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import WorkspaceFullScreenButton
  from '../components/WorkspaceFullScreenButton';

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = { setWorkspaceFullscreen: actions.setWorkspaceFullscreen };

const enhance = compose(
  connect(null, mapDispatchToProps),
  withNamespaces(),
  miradorWithPlugins,
  // further HOC
);

export default enhance(WorkspaceFullScreenButton);
