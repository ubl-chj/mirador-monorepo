import { WorkspaceArea } from '../../components/workspace/WorkspaceArea';
import { connect } from 'react-redux';

const mapStateToProps = state => (
  {
    isWorkspaceAddVisible: state.workspace.isWorkspaceAddVisible,
    isWorkspaceControlPanelVisible: state.config.workspaceControlPanel.enabled,
  }
);

export default connect(mapStateToProps)(WorkspaceArea);
