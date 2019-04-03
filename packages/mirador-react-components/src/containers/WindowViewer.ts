import { fetchAnnotationWorker, fetchInfoResponseWorker, getSelectedCanvases } from '@mirador/core';
import { WindowViewer } from '../components/WindowViewer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend';


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


const enhance: any = compose(
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(WindowViewer);