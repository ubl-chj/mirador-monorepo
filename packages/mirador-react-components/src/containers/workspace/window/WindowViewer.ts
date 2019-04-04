import { fetchAnnotationWorker, fetchInfoResponseWorker, getSelectedCanvases } from '@mirador/core';
import { WindowViewer } from '../../../components/workspace/window/osd-viewer/WindowViewer';
import { connect } from 'react-redux';

const mapStateToProps = (state, { window }) => (
  {
    currentCanvases: getSelectedCanvases(state, { windowId: window.id }),
    infoResponses: state.infoResponses,
  }
);

const mapDispatchToProps = {
  fetchAnnotationWorker,
  fetchInfoResponseWorker,
};

export default connect(mapStateToProps, mapDispatchToProps)(WindowViewer);
