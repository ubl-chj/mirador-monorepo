import { getThumbnailNavigationPosition, updateCompanionWindowWorker } from '@mirador/core';
import { WindowThumbnailSettings } from '../../../components/window/top-menu/WindowThumbnailSettings';
import { connect } from 'react-redux';

const mapDispatchToProps = { updateCompanionWindowWorker };

const mapStateToProps = (state, { windowId }) => (
  {
    thumbnailNavigationPosition: getThumbnailNavigationPosition(state, { windowId }),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(WindowThumbnailSettings);
