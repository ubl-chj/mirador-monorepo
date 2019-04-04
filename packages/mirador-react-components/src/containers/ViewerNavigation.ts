import { getManifestCanvases, setCanvas } from '@mirador/core';
import { ViewerNavigation } from '../components/ViewerNavigation';
import { connect } from 'react-redux';

const mapStateToProps = (state, { window }) => ({
  canvases: getManifestCanvases(state, { windowId: window.id }),
});

const mapDispatchToProps = {
  setCanvas,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewerNavigation);
