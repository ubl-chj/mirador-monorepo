import { compose } from 'redux';
import { connect } from 'react-redux';
import { WindowViewer } from '../components/WindowViewer';
import { withPlugins } from '../extend';
import { fetchAnnotation, fetchInfoResponse, getManifestCanvases } from '@mirador/core';


/**
 * mapStateToProps - to hook up connect
 * @memberof WindowViewer
 * @private
 */
const mapStateToProps = (state, { window }) => (
  {
    canvases: getManifestCanvases(state, { windowId: window.id }),
    infoResponses: state.infoResponses,
  }
);

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof WindowViewer
 * @private
 */
const mapDispatchToProps = {
  fetchAnnotation,
  fetchInfoResponse,
};


const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WindowViewer'),
);

export default enhance(WindowViewer);
