import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend';
import { GalleryView } from '../components/GalleryView';
import { getManifestCanvases, setCanvas } from '@mirador/core';

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowViewer
 * @private
 */
const mapStateToProps = (state, ownProps) => (
  {
    canvases: getManifestCanvases(state, { windowId: ownProps.window.id }),
  }
);

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof WindowViewer
 * @private
 */
const mapDispatchToProps = {
  setCanvas
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('GalleryView'),
  // further HOC go here
);

export default enhance(GalleryView);
