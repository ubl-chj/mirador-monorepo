import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '@mirador/core';
import WorkspaceElastic from '../components/WorkspaceElastic';
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
const mapDispatchToProps = (dispatch, props) => ({
  setWindowSize: (windowId, size) => {
    dispatch(
      actions.setWindowSize(windowId, size),
    );
  },
  setWorkspaceViewportDimensions: (position) => {
    dispatch(
      actions.setWorkspaceViewportDimensions(position),
    );
  },
  setWorkspaceViewportPosition: (position) => {
    dispatch(
      actions.setWorkspaceViewportPosition(position),
    );
  },
  toggleWorkspaceExposeMode: size => dispatch(
    actions.toggleWorkspaceExposeMode(),
  ),
  updateWindowPosition: (windowId, position) => {
    dispatch(
      actions.updateWindowPosition(windowId, position),
    );
  },
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WorkspaceElastic')
);

export default enhance(WorkspaceElastic);
