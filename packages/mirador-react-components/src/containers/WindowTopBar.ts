import { getManifestTitle, maximizeWindow, minimizeWindow, removeWindow, toggleWindowSideBar } from '@mirador/core';
import { WindowTopBar } from '../components/WindowTopBar';
import { connect } from 'react-redux';

const mapStateToProps = (state, { windowId }) => ({
  allowClose: state.config.window.allowClose,
  allowFullscreen: state.config.window.allowFullscreen,
  focused: state.workspace.focusedWindowId === windowId,
  manifestTitle: getManifestTitle(state, { windowId }),
  maximized: state.windows[windowId].maximized,
});

const mapDispatchToProps = (dispatch, { windowId }) => ({
  maximizeWindow: () => dispatch(maximizeWindow({id: windowId})),
  minimizeWindow: () => dispatch(minimizeWindow({id: windowId})),
  removeWindow: () => dispatch(removeWindow({id: windowId})),
  toggleWindowSideBar: () => dispatch(toggleWindowSideBar({id: windowId})),
});

export default connect(mapStateToProps, mapDispatchToProps)(WindowTopBar);
