import React, {ReactElement} from 'react';
import Typography from '@material-ui/core/Typography';
import Window from '../../containers/workspace/window/Window';
import WorkspaceElastic from '../../containers/workspace/WorkspaceElastic';
import WorkspaceMosaic from '../../containers/workspace/WorkspaceMosaic';
import classNames from 'classnames';
import ns from '../../config/css-ns';
import {useTranslation} from "react-i18next"

interface IWorkspace {
  enabled: boolean
  isWorkspaceControlPanelVisible: boolean
  windows: any
  workspaceType: string
}

/**
 * Represents a work area that contains any number of windows
 */
export const Workspace: React.FC<IWorkspace> = (props): ReactElement => {
  const {t} = useTranslation()
  const { enabled, isWorkspaceControlPanelVisible, windows, workspaceType } = props;
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

  const style = enabled ? {paddingTop: 0} : {paddingTop: 64}
  return (
    <div
      className={
        classNames(
          ns('workspace-viewport'),
          (isWorkspaceControlPanelVisible && !enabled && ns('workspace-with-control-panel')),
        )
      }
      style={style}
    >
      <Typography component="h1" variant="srOnly" >{t('miradorViewer')}</Typography>
      {workspaceByType()}
    </div>
  );
}

