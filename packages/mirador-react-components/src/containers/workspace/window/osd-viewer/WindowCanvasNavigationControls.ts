import { WindowCanvasNavigationControls } from '../../../../components/workspace/window/osd-viewer/WindowCanvasNavigationControls';
import { connect } from 'react-redux';
import {getCanvasLabel} from '@mirador/core';

const mapStateToProps = (state, { windowId }) => ({
  canvasLabel: getCanvasLabel(state, {
    canvasIndex: 'selected',
    windowId,
  }),
  visible: state.workspace.focusedWindowId && state.workspace.focusedWindowId.windowId === windowId,
  windowId,
});

export default connect(mapStateToProps)(WindowCanvasNavigationControls);
