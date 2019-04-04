import {
  getAllOrSelectedAnnotationsOnCanvases,
  getCanvasLabel,
  getSelectedCanvases,
  updateViewport
} from '@mirador/core';
import CanvasWorld from '../../../../utils/CanvasWorld';
import { OpenSeadragonViewer } from '../../../../components/workspace/window/osd-viewer/OpenSeadragonViewer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core';
import { withTranslation } from 'react-i18next';

const mapStateToProps = (state, { windowId }) => ({
  annotations: getAllOrSelectedAnnotationsOnCanvases(state, { windowId }),
  canvasWorld: new CanvasWorld(getSelectedCanvases(state, { windowId })),
  label: getCanvasLabel(state, { canvasIndex: 'selected', windowId }),
  viewer: state.viewers[windowId],
});

const mapDispatchToProps = { updateViewport };

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
