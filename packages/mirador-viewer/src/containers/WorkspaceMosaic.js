import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '@mirador/core';
import { WorkspaceMosaic } from '../components/WorkspaceMosaic';

/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */
const mapStateToProps = state => (
  {
    workspace: state.workspace,
  }
);


/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof Workspace
 * @private
 */
const mapDispatchToProps = { updateWorkspaceMosaicLayout: actions.updateWorkspaceMosaicLayout };

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  // further HOC go here
);

export default enhance(WorkspaceMosaic);
