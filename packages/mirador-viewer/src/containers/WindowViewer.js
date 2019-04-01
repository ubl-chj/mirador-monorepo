import { compose } from 'redux';
import { connect } from 'react-redux';
import { WindowViewer } from '../components/WindowViewer';
import { withPlugins } from '../extend';
import { fetchAnnotationWorker, fetchInfoResponseWorker, getManifestCanvases, getSelectedCanvases } from '@mirador/core';

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


const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WindowViewer'),
);

export default enhance(WindowViewer);
