import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Workspace } from '../components/Workspace';
import { withPlugins } from '../extend';

/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */
const mapStateToProps = state => (
  {
    isFullscreenEnabled: state.workspace.isFullscreenEnabled,
    isWorkspaceControlPanelVisible: state.config.workspaceControlPanel.enabled,
    windows: state.windows,
    workspaceType: state.config.workspace.type,
  }
);

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps),
  withPlugins('Workspace'),
);

export default enhance(Workspace);
