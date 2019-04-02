import { Workspace } from '../components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend';
import { withTranslation } from 'react-i18next';

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

const enhance: any = compose(
  withTranslation(),
  connect(mapStateToProps),
  withPlugins('Workspace'),
);

export default enhance(Workspace);
