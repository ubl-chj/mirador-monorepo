import React, {ReactElement} from 'react';
import CompanionArea from '../containers/CompanionArea';
import Paper from '@material-ui/core/Paper';
import PrimaryWindow from '../containers/PrimaryWindow';
import WindowTopBar from '../containers/WindowTopBar';
import cn from 'classnames';
import ns from '../config/css-ns';

interface IWindow {
  classes: any
  focusWindow: any
  label: any
  manifest: any
  t: any
  window: any
  workspaceType: string
}

export const Window: React.FC<IWindow> = (props): ReactElement => {
  /**
   * wrappedTopBar - will conditionally wrap a WindowTopBar for needed
   * additional functionality based on workspace type
   */
  const wrappedTopBar = () => {
    const { manifest, window, workspaceType } = props;
    const { mosaicWindowActions } = this.context;
    const topBar = (
      <div>
        <WindowTopBar
          manifest={manifest}
          windowId={window.id}
        />
      </div>
    );
    if (workspaceType === 'mosaic' && window.maximized === false) {
      return mosaicWindowActions.connectDragSource(
        topBar,
      );
    }
    return topBar;
  }

  const {focusWindow, label, manifest, window, classes, t} = props;

  if (!window) {
    return <></>;
  }

  return (
    <Paper
      aria-label={t('window', { label })}
      className={
        cn(classes.window, ns('window'),
          window.maximized ? ns('workspace-maximized-window') : null)}

      component="section"
      elevation={1}
      id={window.id}
      onFocus={focusWindow}
    >
      {wrappedTopBar()}
      <div className={classes.middle}>
        <div className={classes.middleLeft}>
          <div className={classes.primaryWindow}>
            <PrimaryWindow
              manifest={manifest}
              sideBarOpen={window.sideBarOpen}
              window={window}
            />
          </div>
          <div className={classes.companionAreaBottom}>
            <CompanionArea position="bottom" windowId={window.id}/>
          </div>
        </div>
        <div className={classes.companionAreaRight}>
          <CompanionArea position="right" windowId={window.id}/>
          <CompanionArea position="far-right" windowId={window.id}/>
        </div>
      </div>
      <CompanionArea position="far-bottom" windowId={window.id}/>
    </Paper>
  );
}
