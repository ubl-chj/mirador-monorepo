import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '@mirador/core';
import { withTranslation } from 'react-i18next';
import { OpenSeadragonViewer } from '../components/OpenSeadragonViewer';
import {
  getCanvasLabel,
  getSelectedCanvas,
} from '../state/selectors';

/**
 * mapStateToProps - used to hook up connect to action creators
 * @memberof Window
 * @private
 */
const mapStateToProps = ({ viewers, windows, manifests }, { windowId }) => ({
  viewer: viewers[windowId],
  label: getCanvasLabel(
    getSelectedCanvas({ windows, manifests }, windowId),
    windows[windowId].canvasIndex,
  ),
});

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = {
  updateViewport: actions.updateViewport,
};

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
);


export default enhance(OpenSeadragonViewer);
