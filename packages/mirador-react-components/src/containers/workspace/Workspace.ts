import { Workspace } from '../../components/workspace/Workspace';
import { connect } from 'react-redux';

const mapStateToProps = state => (
  {
    enabled: state.workspace.enabled,
    isWorkspaceControlPanelVisible: state.config.workspaceControlPanel.enabled,
    windows: state.windows,
    workspaceType: state.config.workspace.type,
  }
);

export default connect(mapStateToProps)(Workspace);
