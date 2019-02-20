import { compose } from 'redux';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import {
  getManifestTitle, getManifestLogo, getManifestThumbnail, getManifestCanvases, getManifestProvider,
} from '../state/selectors';
import * as actions from '../state/actions';
import ManifestListItem from '../components/ManifestListItem';

/** */
const mapStateToProps = (state, { manifestId }) => {
  const manifest = state.manifests[manifestId];

  return {
    ready: !!manifest.manifestation,
    error: manifest.error,
    isFetching: manifest.isFetching,
    title: getManifestTitle(manifest),
    logo: getManifestLogo(manifest),
    thumbnail: getManifestThumbnail(manifest),
    provider: getManifestProvider(manifest),
    size: getManifestCanvases(manifest).length,
  };
};

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = { addWindow: actions.addWindow, fetchManifest: actions.fetchManifest };

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNamespaces(),
  // further HOC go here
);

export default enhance(ManifestListItem);
