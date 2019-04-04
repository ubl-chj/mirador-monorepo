import {
  getCanvasDescription,
  getCanvasLabel,
  getDestructuredMetadata,
  getManifestDescription,
  getManifestMetadata,
  getManifestTitle,
  getSelectedCanvas,
} from '@mirador/core';
import { WindowSideBarInfoPanel } from '../components/WindowSideBarInfoPanel';
import { connect } from 'react-redux';

const mapStateToProps = (state, { windowId }) => ({
  canvasDescription: getCanvasDescription(state, { canvasIndex: 'selected', windowId }),
  canvasLabel: getCanvasLabel(state, { canvasIndex: 'selected', windowId }),
  canvasMetadata: getDestructuredMetadata(getSelectedCanvas(state, { windowId })),
  manifestDescription: getManifestDescription(state, { windowId }),
  manifestLabel: getManifestTitle(state, { windowId }),
  manifestMetadata: getManifestMetadata(state, { windowId }),
});

export default connect(mapStateToProps, null)(WindowSideBarInfoPanel);
