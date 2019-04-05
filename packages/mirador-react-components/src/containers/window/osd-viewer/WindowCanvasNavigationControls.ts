import { WindowCanvasNavigationControls } from '../../../components/window/osd-viewer/WindowCanvasNavigationControls';
import { connect } from 'react-redux';
import {getCanvasLabel} from '@mirador/core';

const mapStateToProps = (state, { windowId }) => ({
  canvasLabel: getCanvasLabel(state, {
    canvasIndex: 'selected',
    windowId,
  }),
  visible: state.workspace.focusedWindowId === windowId,
  windowId,
});

export default connect(mapStateToProps)(WindowCanvasNavigationControls);
