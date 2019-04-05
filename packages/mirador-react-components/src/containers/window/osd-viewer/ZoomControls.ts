import { ZoomControls } from '../../../components/window/osd-viewer/ZoomControls';
import { connect } from 'react-redux';
import {updateViewport} from '@mirador/core';

const mapStateToProps = (state, props) => (
  {
    showZoomControls: state.workspace.showZoomControls,
    viewer: state.viewers[props.windowId],
  }
);

const mapDispatchToProps = { updateViewport };

export default connect(mapStateToProps, mapDispatchToProps)(ZoomControls);
