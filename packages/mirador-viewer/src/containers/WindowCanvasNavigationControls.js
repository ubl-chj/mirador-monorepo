import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  getCanvasLabel,
  getSelectedCanvas,
} from '@mirador/core';
import { WindowCanvasNavigationControls } from '../components/WindowCanvasNavigationControls';
import { withPlugins } from '../extend';

/** */
const mapStateToProps = (state, { windowId }) => ({
  canvasLabel: getCanvasLabel(state, {
    canvasIndex: 'selected',
    windowId,
  }),
  visible: state.workspace.focusedWindowId === windowId,
  window: state.windows[windowId],
});

const enhance = compose(
  connect(mapStateToProps),
  withPlugins('WindowCanvasNavigationControls'),
);

export default enhance(WindowCanvasNavigationControls);
