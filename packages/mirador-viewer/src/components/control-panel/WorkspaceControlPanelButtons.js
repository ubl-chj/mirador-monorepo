import React, { Component } from 'react';
import WorkspaceFullScreenButton from '../../containers/control-panel/WorkspaceFullScreenButton';
import WorkspaceAddButton from '../../containers/control-panel/WorkspaceAddButton';
import WorkspaceMenuButton from '../../containers/control-panel/WorkspaceMenuButton';

/** Renders plugins */
const PluginHook = (props) => {
  const { PluginComponent } = props; // eslint-disable-line react/prop-types
  return PluginComponent ? <PluginComponent {...props} /> : null;
};

/**
 *
 */
export class WorkspaceControlPanelButtons extends Component {
  /**
   * render
   *
   * @return {type}  description
   */
  render() {
    return (
      <>
        <WorkspaceAddButton />
        <WorkspaceMenuButton />
        <WorkspaceFullScreenButton />
        <PluginHook {...this.props} />
      </>
    );
  }
}
