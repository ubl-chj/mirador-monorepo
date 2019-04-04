import { WindowCanvasNavigationControls } from '../components/WindowCanvasNavigationControls';
import { connect } from 'react-redux';
import {getCanvasLabel} from '@mirador/core';

const mapStateToProps = (state, { windowId }) => ({
  canvasLabel: getCanvasLabel(state, {
    canvasIndex: 'selected',
    windowId,
  }),
  visible: state.workspace.focusedWindowId === windowId,
  window: state.windows[windowId],
});

export default connect(mapStateToProps)(WindowCanvasNavigationControls);
