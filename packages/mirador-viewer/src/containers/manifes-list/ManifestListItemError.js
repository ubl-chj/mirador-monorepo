import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { fetchManifest, removeManifest } from '@mirador/core';
import { ManifestListItemError } from '../components/ManifestListItemError';
import { withPlugins } from '../extend';

/** */
const mapDispatchToProps = {
  onDismissClick: removeManifest,
  onTryAgainClick: fetchManifest,
};

/**
 *
 * @param theme
 * @returns {{manifestIdText: {wordBreak: string},
 * errorIcon: {color: string, width: string, height: string}}}
 */
const styles = theme => ({
  errorIcon: {
    color: theme.palette.error.main,
    height: '2rem',
    width: '2rem',
  },
  manifestIdText: {
    wordBreak: 'break-all',
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(null, mapDispatchToProps),
  withPlugins('ManifestListItem'),
);

export default enhance(ManifestListItemError);
