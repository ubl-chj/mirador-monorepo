import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '@mirador/actions';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import OpenSeadragonViewer from '../components/OpenSeadragonViewer';

/**
 * mapStateToProps - used to hook up connect to action creators
 * @memberof Window
 * @private
 */
const mapStateToProps = ({ viewers }, { windowId }) => ({
  viewer: viewers[windowId],
});

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = {
  updateViewport: actions.updateViewport,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  miradorWithPlugins,
  // further HOC go here
);


export default enhance(OpenSeadragonViewer);
