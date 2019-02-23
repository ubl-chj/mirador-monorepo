import { compose } from 'redux';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import * as actions from '@mirador/core';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import { getThumbnailNavigationPosition } from '../state/selectors';
import WindowThumbnailSettings from '../components/WindowThumbnailSettings';

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = { setWindowThumbnailPosition: actions.setWindowThumbnailPosition };

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowViewer
 * @private
 */
const mapStateToProps = (state, props) => (
  {
    thumbnailNavigationPosition: getThumbnailNavigationPosition(state, props.windowId),
  }
);

const enhance = compose(
  withNamespaces(),
  connect(mapStateToProps, mapDispatchToProps),
  miradorWithPlugins,
  // further HOC go here
);

export default enhance(WindowThumbnailSettings);
