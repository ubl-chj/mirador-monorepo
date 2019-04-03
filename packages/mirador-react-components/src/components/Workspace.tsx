import React, {ReactElement} from 'react';
import Typography from '@material-ui/core/Typography';
import Window from '../containers/Window';
import WorkspaceElastic from '../containers/WorkspaceElastic';
import WorkspaceMosaic from '../containers/WorkspaceMosaic';
import classNames from 'classnames';
import ns from '../config/css-ns';

interface IWorkspace {
  isFullscreenEnabled: boolean
  isWorkspaceControlPanelVisible: boolean
  t: Function
  windows: any
  workspaceType: string
}
/**
 * Represents a work area that contains any number of windows
 * @memberof Workspace
 * @private
 */
export const Workspace: React.FC<IWorkspace> = (props): ReactElement => {
  const { isFullscreenEnabled, isWorkspaceControlPanelVisible, t, windows, workspaceType } = props;
  /**
   * Determine whether or not there are maximized windows
   */
  const maximizedWindows = () => {
    const windowKeys = Object.keys(windows).sort();
    const maximizedWindows = windowKeys
      .map(id => windows[id])
      .filter(window => window.maximized === true);
    if (maximizedWindows.length) {
      return Object.values(maximizedWindows).map(window => (
        <Window
          className={classNames(ns('workspace-maximized-window'))}
          key={window.id}
          window={window}
        />
      ));
    }
    return false;
  }

  /**
   * Determine which workspace to render by configured type
   */
  const workspaceByType = () => {
    if (maximizedWindows()) {
      return maximizedWindows();
    }
    switch (workspaceType) {
      case 'elastic':
        return <WorkspaceElastic />;
      case 'mosaic':
        return <WorkspaceMosaic windows={windows} />;
      default:
        return Object.values(windows).map((window: any) => (
          <Window
            key={window.id}
            window={window}
          />
        ));
    }
  }

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
      <Typography component="h1" variant="srOnly" >{t('miradorViewer')}</Typography>
      {workspaceByType()}
    </div>
  );
}

