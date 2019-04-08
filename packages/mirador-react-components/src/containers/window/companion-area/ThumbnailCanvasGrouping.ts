import { getWindow, setCanvas } from '@mirador/core';
import { ThumbnailCanvasGrouping } from '../../../components/window/companion-area/ThumbnailCanvasGrouping';
import { connect } from 'react-redux';

const mapDispatchToProps = {setCanvas};

const mapStateToProps = (state, { data }) => ({
  window: getWindow(state, { windowId: data.windowId }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ThumbnailCanvasGrouping)
