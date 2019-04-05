import { getManifestCanvases, setCanvas } from '@mirador/core';
import { ViewerNavigation } from '../../../components/window/osd-viewer/ViewerNavigation';
import { connect } from 'react-redux';

const mapStateToProps = (state, { windowId }) => ({
  canvases: getManifestCanvases(state, { windowId }),
  visible: state.workspace.focusedWindowId === windowId,
  window: state.windows[windowId],
});

const mapDispatchToProps = {
  setCanvas,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewerNavigation);
