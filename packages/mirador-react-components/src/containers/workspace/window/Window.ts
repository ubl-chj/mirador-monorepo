import { focusWindow, getManifestTitle, getThumbnailNavigationPosition } from '@mirador/core';
import { Window } from '../../../components/workspace/window/Window';
import { connect } from 'react-redux';

const mapStateToProps = (state, props) => ({
  label: getManifestTitle(state, { windowId: props.window.id }),
  manifest: state.manifests[props.window.manifestId],
  thumbnailNavigationPosition: getThumbnailNavigationPosition(state, { windowId: props.window.id }),
  window: state.windows[props.window.id],
  workspaceType: state.config.workspace.type,
});

const mapDispatchToProps = (dispatch, { window }) => ({
  focusWindow: () => dispatch(focusWindow(window.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Window);
