import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '@mirador/core';
import { withTranslation } from 'react-i18next';
import { WorkspaceFullScreenButton }
  from '../../components/control-panel/WorkspaceFullScreenButton';
import { withPlugins } from '../../extend';

/**
 * mapStateToProps - to hook up connect
 * @memberof WorkspaceFullScreenButton
 * @private
 */
const mapStateToProps = state => ({
  isFullscreenEnabled: state.workspace.isFullscreenEnabled,
});

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = { setWorkspaceFullscreen: actions.setWorkspaceFullscreen };

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WorkspaceFullScreenButton')
);

export default enhance(WorkspaceFullScreenButton);
