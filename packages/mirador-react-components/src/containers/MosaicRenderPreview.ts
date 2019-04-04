import { MosaicRenderPreview } from '../components/MosaicRenderPreview';
import { connect } from 'react-redux';
import { getManifestTitle } from '@mirador/core';

/** */
const mapStateToProps = (state, { windowId }) => (
  {
    title: getManifestTitle(state, { windowId }),
  }
);

export default connect(mapStateToProps, null)(MosaicRenderPreview);
