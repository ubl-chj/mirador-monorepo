import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Window from '../containers/Window';
import WorkspaceMosaic from '../containers/WorkspaceMosaic';
import WorkspaceElastic from '../containers/WorkspaceElastic';
import ns from '../config/css-ns';

/**
 * Represents a work area that contains any number of windows
 * @memberof Workspace
 * @private
 */
export class Workspace extends React.Component {
  /**
   * Determine which workspace to render by configured type
   */
  workspaceByType() {
    const { workspaceType, windows } = this.props;
    if (this.maximizedWindows()) {
      return this.maximizedWindows();
    }
    switch (workspaceType) {
      case 'elastic':
        return <WorkspaceElastic />;
      case 'mosaic':
        return <WorkspaceMosaic windows={windows} />;
      default:
        return Object.values(windows).map(window => (
          <Window
            key={window.id}
            window={window}
          />
        ));
    }
  }

  /**
   * Determine whether or not there are maximized windows
   */
  maximizedWindows() {
    const { windows } = this.props;
    const windowKeys = Object.keys(windows).sort();
    const maximizedWindows = windowKeys
      .map(id => windows[id])
      .filter(window => window.maximized === true);
    if (maximizedWindows.length) {
      return Object.values(maximizedWindows).map(window => (
        <Window
          key={window.id}
          window={window}
          className={classNames(ns('workspace-maximized-window'))}
        />
      ));
    }
    return false;
  }

  /**
   * render
   */
  render() {
    const { isFullscreenEnabled, isWorkspaceControlPanelVisible, t } = this.props;
    const style = isFullscreenEnabled ? {paddingTop: 0} : {paddingTop: 64}
    return (
      <div
        className={
          classNames(
            ns('workspace-viewport'),
            (isWorkspaceControlPanelVisible && !isFullscreenEnabled && ns('workspace-with-control-panel')),
          )
        }
        style={style}
      >
        <Typography variant="srOnly" component="h1">{t('miradorViewer')}</Typography>
        {this.workspaceByType()}
      </div>
    );
  }
}

Workspace.propTypes = {
  isWorkspaceControlPanelVisible: PropTypes.bool.isRequired,
  windows: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  workspaceType: PropTypes.string.isRequired, // eslint-disable-line react/forbid-prop-types
  t: PropTypes.func.isRequired,
};
