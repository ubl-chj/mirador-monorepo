import { WindowCanvasNavigationControls } from '../components/WindowCanvasNavigationControls';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {getCanvasLabel} from '@mirador/core';
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

const enhance: any = compose(
  connect(mapStateToProps),
);

export default enhance(WindowCanvasNavigationControls);
