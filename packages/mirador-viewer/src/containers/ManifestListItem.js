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
    error: manifest.error,
    isFetching: manifest.isFetching,
    manifestLogo: getManifestLogo(state, { manifestId }),
    provider: manifest.provider || getManifestProvider(state, { manifestId }),
    ready: !!manifest.json,
    size: getManifestCanvases(state, { manifestId }).length,
    thumbnail: getManifestThumbnail(state, { manifestId }),
    title: getManifestTitle(state, { manifestId }),
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
  label: {
    textAlign: 'left',
    textTransform: 'initial',
  },
  logo: {
    height: '2.5rem',
    paddingRight: 8,
  },
  placeholder: {
    backgroundColor: theme.palette.grey[300],
  },
  root: {
    ...theme.mixins.gutters(),
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('ManifestListItem'),
);

export default enhance(ManifestListItem);
