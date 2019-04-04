import {
  getManifestCanvases,
  setCanvas
} from '@mirador/core';
import { WindowSideBarCanvasPanel } from '../../../../components/workspace/window/companion-area/WindowSideBarCanvasPanel';
import { connect } from 'react-redux';

const mapStateToProps = (state, { windowId }) => {
  const canvases = getManifestCanvases(state, { windowId });
  const { config } = state;
  return {
    canvases,
    config,
  };
};

const mapDispatchToProps = { setCanvas };

export default connect(mapStateToProps, mapDispatchToProps)(WindowSideBarCanvasPanel);
