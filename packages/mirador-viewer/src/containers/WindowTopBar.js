import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { getManifestTitle, removeWindow, maximizeWindow, minimizeWindow, toggleWindowSideBar } from '@mirador/core';
import { WindowTopBar } from '../components/WindowTopBar';
import React from "react"
import { withPlugins } from '../extend';

/** mapStateToProps */
const mapStateToProps = (state, { windowId }) => ({
  manifestTitle: getManifestTitle(state, { windowId }),
  maximized: state.windows[windowId].maximized,
  focused: state.workspace.focusedWindowId === windowId,
  allowClose: state.config.window.allowClose,
  allowFullscreen: state.config.window.allowFullscreen,
});

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = (dispatch, { windowId }) => ({
  removeWindow: () => dispatch(removeWindow(windowId)),
  maximizeWindow: () => dispatch(maximizeWindow(windowId)),
  minimizeWindow: () => dispatch(minimizeWindow(windowId)),
  toggleWindowSideBar: () => dispatch(toggleWindowSideBar(windowId)),
});

/**
 * @param theme
 * @returns {{typographyBody: {flexGrow: number, fontSize: number|string},
 * windowTopBarStyle: {minHeight: number, paddingLeft: number, backgroundColor: string}}}
 */
const styles = theme => ({
  title: {
    ...theme.typography.h6,
    flexGrow: 1,
    paddingLeft: theme.spacing.unit / 2,
  },
  windowTopBarStyle: {
    minHeight: 32,
    paddingLeft: theme.spacing.unit / 2,
    paddingRight: theme.spacing.unit / 2,
    backgroundColor: theme.palette.primary.light,
    borderTop: '4px solid transparent',
  },
  focused: {
    borderTop: `4px solid ${theme.palette.focused.main}`,
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WindowTopBar'),
);

export default enhance(WindowTopBar);
