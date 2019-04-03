import { getManifestCanvases, setCanvas } from '@mirador/core';
import { ViewerNavigation } from '../components/ViewerNavigation';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend';
import { withTranslation } from 'react-i18next';

/** */
const mapStateToProps = (state, { window }) => ({
  canvases: getManifestCanvases(state, { windowId: window.id }),
});

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestForm
 * @private
 */
const mapDispatchToProps = {
  setCanvas,
};

const enhance: any = compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(ViewerNavigation);
