import { getCanvasLabel, getManifestCanvases } from '@mirador/core';
import { ViewerInfo } from '../../../../components/workspace/window/osd-viewer/ViewerInfo';
import { connect } from 'react-redux';

const mapStateToProps = (state, props) => {
  const { windowId } = props;
  const canvases = getManifestCanvases(state, { windowId });
  const { canvasIndex } = state.windows[windowId];

  return {
    canvasCount: canvases.length,
    canvasIndex,
    canvasLabel: getCanvasLabel(state, {
      canvasIndex,
      windowId,
    }),
  };
};

export default connect(mapStateToProps, null)(ViewerInfo);
