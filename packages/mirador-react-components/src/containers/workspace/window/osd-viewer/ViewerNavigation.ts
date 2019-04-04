import { getManifestCanvases, setCanvas } from '@mirador/core';
import { ViewerNavigation } from '../../../../components/workspace/window/osd-viewer/ViewerNavigation';
import { connect } from 'react-redux';

const mapStateToProps = (state, { windowId }) => ({
  canvases: getManifestCanvases(state, { windowId }),
  window: state.windows[windowId],
});

const mapDispatchToProps = {
  setCanvas,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewerNavigation);
