import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '@mirador/core';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { ManifestForm } from '../components/ManifestForm';
import { withPlugins } from '../extend';

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestForm
 * @private
 */
const mapDispatchToProps = { fetchManifest: actions.fetchManifest };
/**
 *
 * @param theme
 */
const styles = theme => ({
  buttons: {
    textAlign: 'right',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'inherit',
    },
  },
  input: {
    ...theme.typography.body1,
  },
});

const enhance = compose(
  withStyles(styles),
  withTranslation(),
  connect(null, mapDispatchToProps),
  withPlugins('ManifestForm'),
);

export default enhance(ManifestForm);
