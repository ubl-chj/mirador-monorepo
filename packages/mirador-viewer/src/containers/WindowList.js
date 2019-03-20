import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '@mirador/core';
import { withTranslation } from 'react-i18next';
import { WindowList } from '../components/WindowList';
import { withPlugins } from '../extend';

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = {
  focusWindow: actions.focusWindow,
};

/**
 * mapStateToProps - to hook up connect
 * @memberof WorkspaceControlPanel
 * @private
 */
const mapStateToProps = state => (
  {
    containerId: state.config.id,
    windows: state.windows,
    manifests: state.manifests,
  }
);

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WindowList'),
);

export default enhance(WindowList);
