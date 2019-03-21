import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { ViewerInfo } from '../components/ViewerInfo';
import { withPlugins } from '../extend';
import { getCanvasLabel, getManifestCanvases } from '@mirador/core';

/**
 * mapStateToProps - to hook up connect
 * @memberof Window
 * @private
 */
const mapStateToProps = (state, props) => {
  const { windowId } = props;
  const canvases = getManifestCanvases(state, { windowId });
  const { canvasIndex } = state.windows[windowId];

  return {
    canvasCount: canvases.length,
    canvasIndex,
    canvasLabel: getCanvasLabel(canvases[canvasIndex], canvasIndex),
  };
};

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, null),
  withPlugins('ViewerInfo'),
);

export default enhance(ViewerInfo);
