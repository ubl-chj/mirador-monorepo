import { compose } from 'redux';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import * as actions from '@mirador/core';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import { getWindowViewType } from '../state/selectors';
import WindowViewSettings from '../components/WindowViewSettings';

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = { setWindowViewType: actions.setWindowViewType };

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowViewer
 * @private
 */
const mapStateToProps = (state, props) => (
  {
    windowViewType: getWindowViewType(state, props.windowId),
  }
);

const enhance = compose(
  withNamespaces(),
  connect(mapStateToProps, mapDispatchToProps),
  miradorWithPlugins,
);

export default enhance(WindowViewSettings);
