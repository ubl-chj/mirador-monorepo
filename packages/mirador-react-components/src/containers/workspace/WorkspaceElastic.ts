import {setWindowSize, setWorkspaceViewportDimensions, setWorkspaceViewportPosition,
  toggleWorkspaceExposeMode, updateWindowPosition} from '@mirador/core';
import {WorkspaceElastic} from '../../components/workspace/WorkspaceElastic';
import { connect } from 'react-redux';

const mapStateToProps = state => (
  {
    windows: state.windows,
    workspace: state.workspace,
  }
);

const mapDispatchToProps = {
  setWindowSize,
  setWorkspaceViewportDimensions,
  setWorkspaceViewportPosition,
  toggleWorkspaceExposeMode,
  updateWindowPosition
}


export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceElastic);
