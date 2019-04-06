import {
  getCanvasLabel,
  getHighlightedAnnotationsOnCanvases, getManifestCanvases, getSelectedAnnotationsOnCanvases,
  getSelectedCanvases, setCanvas,
  updateViewport
} from '@mirador/core';
import CanvasWorld from '../../../utils/CanvasWorld';
import { OpenSeadragonViewer } from '../../../components/window/osd-viewer/OpenSeadragonViewer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core';
import { withTranslation } from 'react-i18next';

const mapStateToProps = (state, { windowId }) => ({
  canvasWorld: new CanvasWorld(getSelectedCanvases(state, { windowId })),
  canvases: getManifestCanvases(state, { windowId }),
  highlightedAnnotations: getHighlightedAnnotationsOnCanvases(state, { windowId }),
  label: getCanvasLabel(state, { canvasIndex: 'selected', windowId }),
  selectedAnnotations: getSelectedAnnotationsOnCanvases(state, { windowId }),
  viewer: state.viewers[windowId],
  visible: state.workspace.focusedWindowId === windowId,
  window: state.windows[windowId],
});

const mapDispatchToProps = { setCanvas, updateViewport };

/**
 *
 * @param theme
 * @returns {{windowSideBarHeading: *}}
 */
const styles: any = theme => ({
  controls: {
    backgroundColor: fade(theme.palette.background.paper, 0.5),
    bottom: 0,
    position: 'absolute',
    width: '100%',
    zIndex: 50,
  },
});

const enhance: any = compose(
  withStyles(styles),
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
);


export default enhance(OpenSeadragonViewer);
