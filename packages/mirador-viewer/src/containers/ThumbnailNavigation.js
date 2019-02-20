import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '@mirador/actions';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import ThumbnailNavigation from '../components/ThumbnailNavigation';
import { getManifestCanvases } from '../state/selectors';
/**
 * mapStateToProps - used to hook up state to props
 * @memberof ThumbnailNavigation
 * @private
 */
const mapStateToProps = ({ config }, { manifest }) => ({
  canvases: getManifestCanvases(manifest),
  config,
});

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ThumbnailNavigation
 * @private
 */
const mapDispatchToProps = {
  setCanvas: actions.setCanvas,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  miradorWithPlugins,
  // further HOC go here
);

export default enhance(ThumbnailNavigation);
