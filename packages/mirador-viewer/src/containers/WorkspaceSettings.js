import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '@mirador/core';
import { withTranslation } from 'react-i18next';
import { WorkspaceSettings } from '../components/WorkspaceSettings';
import { withPlugins } from '../extend';

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
const mapStateToProps = state => (
  {
    theme: state.config.theme,
  }
);

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WorkspaceSettings')
);

export default enhance(WorkspaceSettings);
