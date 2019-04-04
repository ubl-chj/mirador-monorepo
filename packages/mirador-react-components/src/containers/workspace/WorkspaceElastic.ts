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

const mapDispatchToProps = (dispatch) => ({
  setWindowSize: (windowId, size) => {
    dispatch(
      setWindowSize({size, windowId}),
    );
  },
  setWorkspaceViewportDimensions: (position) => {
    dispatch(
      setWorkspaceViewportDimensions({position}),
    );
  },
  setWorkspaceViewportPosition: (position) => {
    dispatch(
      setWorkspaceViewportPosition({position}),
    );
  },
  toggleWorkspaceExposeMode: () => dispatch(
    toggleWorkspaceExposeMode,
  ),
  updateWindowPosition: (windowId, position) => {
    dispatch(
      updateWindowPosition({position, windowId}),
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceElastic);
