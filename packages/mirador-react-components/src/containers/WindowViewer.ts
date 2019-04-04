import { fetchAnnotationWorker, fetchInfoResponseWorker, getSelectedCanvases } from '@mirador/core';
import { WindowViewer } from '../components/WindowViewer';
import { connect } from 'react-redux';

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowViewer
 * @private
 */
const mapStateToProps = (state, { window }) => (
  {
    currentCanvases: getSelectedCanvases(state, { windowId: window.id }),
    infoResponses: state.infoResponses,
  }
);

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof WindowViewer
 * @private
 */
const mapDispatchToProps = {
  fetchAnnotationWorker,
  fetchInfoResponseWorker,
};

export default connect(mapStateToProps, mapDispatchToProps)(WindowViewer);
