import { Workspace } from '../components/Workspace';
import { connect } from 'react-redux';

const mapStateToProps = state => (
  {
    isFullscreenEnabled: state.workspace.isFullscreenEnabled,
    isWorkspaceControlPanelVisible: state.config.workspaceControlPanel.enabled,
    windows: state.windows,
    workspaceType: state.config.workspace.type,
  }
);

export default connect(mapStateToProps)(Workspace);
