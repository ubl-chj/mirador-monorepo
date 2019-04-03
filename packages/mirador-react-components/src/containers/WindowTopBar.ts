import { getManifestTitle, maximizeWindow, minimizeWindow, removeWindow, toggleWindowSideBar } from '@mirador/core';
import { WindowTopBar } from '../components/WindowTopBar';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend';
import { withStyles } from '@material-ui/core';
import { withTranslation } from 'react-i18next';

/** mapStateToProps */
const mapStateToProps = (state, { windowId }) => ({
  allowClose: state.config.window.allowClose,
  allowFullscreen: state.config.window.allowFullscreen,
  focused: state.workspace.focusedWindowId === windowId,
  manifestTitle: getManifestTitle(state, { windowId }),
  maximized: state.windows[windowId].maximized,
});

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = (dispatch, { windowId }) => ({
  maximizeWindow: () => dispatch(maximizeWindow({id: windowId})),
  minimizeWindow: () => dispatch(minimizeWindow({id: windowId})),
  removeWindow: () => dispatch(removeWindow({id: windowId})),
  toggleWindowSideBar: () => dispatch(toggleWindowSideBar({id: windowId})),
});

/**
 * @param theme
 * @returns {{typographyBody: {flexGrow: number, fontSize: number|string},
 * windowTopBarStyle: {minHeight: number, paddingLeft: number, backgroundColor: string}}}
 */
const styles = theme => ({
  focused: {
    borderTop: `4px solid ${theme.palette.focused.main}`,
  },
  title: {
    ...theme.typography.h6,
    flexGrow: 1,
    paddingLeft: theme.spacing.unit / 2,
  },
  windowTopBarStyle: {
    '&$focused': {
      borderTop: `4px solid ${theme.palette.secondary.main}`,
    },
    backgroundColor: theme.palette.primary.light,
    minHeight: 32,
    paddingLeft: theme.spacing.unit / 2,
    paddingRight: theme.spacing.unit / 2,
  },
});

const enhance: any = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(WindowTopBar);
