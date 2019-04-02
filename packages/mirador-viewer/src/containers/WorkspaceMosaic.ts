import { WorkspaceMosaic } from '../components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {updateWorkspaceMosaicLayout} from '@mirador/core';
import { withPlugins } from '../extend';

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
const mapDispatchToProps = { updateWorkspaceMosaicLayout };

const enhance: any = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WorkspaceMosaic')
);

export default enhance(WorkspaceMosaic);
