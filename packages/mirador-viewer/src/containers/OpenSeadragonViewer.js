import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { OpenSeadragonViewer } from '../components/OpenSeadragonViewer';
import {
  getAllOrSelectedAnnotations,
  getCanvasLabel,
  getSelectedAnnotationIds,
  updateViewport
} from '@mirador/core';
import { withPlugins } from '../extend';

/**
 * mapStateToProps - used to hook up connect to action creators
 * @memberof Window
 * @private
 */
const mapStateToProps = ({
  viewers, windows, manifests, annotations,
}, { windowId, currentCanvases }) => ({
  annotations: getAllOrSelectedAnnotations(
    { annotations, windows },
    windowId,
    currentCanvases.map(c => c.id),
    getSelectedAnnotationIds({ windows }, windowId, currentCanvases.map(c => c.id)),
  ),
  label: getCanvasLabel({
    manifests,
    windows,
  }, {
    canvasIndex: 'selected',
    windowId,
  }),
  viewer: viewers[windowId],
});

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = {
  updateViewport,
};

/**
 *
 * @param theme
 * @returns {{windowSideBarHeading: *}}
 */
const styles = theme => ({
  controls: {
    backgroundColor: fade(theme.palette.background.paper, 0.5),
    bottom: 0,
    position: 'absolute',
    width: '100%',
    zIndex: 50,
  },
});

const enhance = compose(
  withStyles(styles),
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('OpenSeadragonViewer'),
);


export default enhance(OpenSeadragonViewer);
