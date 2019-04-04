import { getManifestCanvases, setCanvas } from '@mirador/core';
import { GalleryView } from '../../../components/workspace/window/GalleryView';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => (
  {
    canvases: getManifestCanvases(state, { windowId: ownProps.window.id }),
  }
);

const mapDispatchToProps = {
  setCanvas
};

export default connect(mapStateToProps, mapDispatchToProps)(GalleryView);
