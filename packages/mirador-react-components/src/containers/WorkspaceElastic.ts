import {setWindowSize, setWorkspaceViewportDimensions, setWorkspaceViewportPosition,
  toggleWorkspaceExposeMode, updateWindowPosition} from '@mirador/core';
import {WorkspaceElastic} from '../components/WorkspaceElastic';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend';

/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */
const mapStateToProps = state => (
  {
    windows: state.windows,
    workspace: state.workspace,
  }
);

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof Workspace
 * @private
 */
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
