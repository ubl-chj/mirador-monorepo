import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '@mirador/core';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { WorkspaceFullScreenButton }
  from '../components/WorkspaceFullScreenButton';

/**
 * mapStateToProps - to hook up connect
 * @memberof WorkspaceFullScreenButton
 * @private
 */
const mapStateToProps = state => ({
  isFullscreenEnabled: state.workspace.isFullscreenEnabled,
});

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
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(WorkspaceFullScreenButton);
