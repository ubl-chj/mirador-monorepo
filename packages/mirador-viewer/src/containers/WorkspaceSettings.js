import { compose } from 'redux';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import * as actions from '@mirador/actions';
import WorkspaceSettings from '../components/WorkspaceSettings';

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
  connect(mapStateToProps, mapDispatchToProps),
  withNamespaces(),
  // further HOC go here
);

export default enhance(WorkspaceSettings);
