import { connect } from 'react-redux';
import { compose } from 'redux';
import { withNamespaces } from 'react-i18next';
import * as actions from '@mirador/core';
import { withStyles } from '@material-ui/core';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import WorkspaceFullScreenButton
  from '../components/WorkspaceFullScreenButton';

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = { setWorkspaceFullscreen: actions.setWorkspaceFullscreen };

/**
 *
 * @param theme
 * @returns {{ctrlBtn: {margin: (number|string)}}}
 */
const styles = theme => ({
  ctrlBtn: {
    margin: theme.spacing.unit,
  },
});

const enhance = compose(
  withNamespaces(),
  withStyles(styles),
  connect(null, mapDispatchToProps),
  miradorWithPlugins,
);

export default enhance(WorkspaceFullScreenButton);
