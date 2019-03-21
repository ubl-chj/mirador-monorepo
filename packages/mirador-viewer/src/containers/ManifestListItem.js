import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import {
  addWindow, fetchManifest,
  getManifestTitle, getManifestThumbnail, getManifestCanvases,
  getManifestLogo, getManifestProvider,
} from '@mirador/core';
import { ManifestListItem } from '../components/ManifestListItem';
import { withPlugins } from '../extend';

/** */
const mapStateToProps = (state, { manifestId }) => {
  const manifest = state.manifests[manifestId];

  return {
    ready: !!manifest.json,
    error: manifest.error,
    isFetching: manifest.isFetching,
    title: getManifestTitle(state, { manifestId }),
    thumbnail: getManifestThumbnail(state, { manifestId }),
    provider: manifest.provider || getManifestProvider(state, { manifestId }),
    size: getManifestCanvases(state, { manifestId }).length,
    manifestLogo: getManifestLogo(state, { manifestId }),
  };
};

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = { addWindow, fetchManifest };

/**
 *
 * @param theme
 * @returns {{root: {}, label: {textAlign: string, textTransform: string}}}
 */
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
  },
  label: {
    textTransform: 'initial',
    textAlign: 'left',
  },
  logo: {
    height: '2.5rem',
    paddingRight: 8,
  },
  placeholder: {
    backgroundColor: theme.palette.grey[300],
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('ManifestListItem'),
);

export default enhance(ManifestListItem);
