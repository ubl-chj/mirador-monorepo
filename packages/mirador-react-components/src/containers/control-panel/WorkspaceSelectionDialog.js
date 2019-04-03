import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { WorkspaceSelectionDialog } from '../../components/control-panel/WorkspaceSelectionDialog';
import * as actions from '@mirador/core';
import { withPlugins } from '../../extend';

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = {
  updateConfig: actions.updateConfig,
};

/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */
const mapStateToProps = state => ({ workspaceType: state.config.workspace.type });

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WorkspaceSelectionDialog')
);

export default enhance(WorkspaceSelectionDialog);
