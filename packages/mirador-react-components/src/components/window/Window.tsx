import React, {ReactElement, useContext} from 'react';
import CompanionArea from '../../containers/window/companion-area/CompanionArea';
import {ModernMosaicWindowContext} from 'react-mosaic-component';
import Paper from '@material-ui/core/Paper';
import PrimaryWindow from '../../containers/window/PrimaryWindow';
import WindowTopBar from '../../containers/window/WindowTopBar';
import cn from 'classnames';
import {makeStyles} from "@material-ui/styles"
import ns from '../../config/css-ns';
import {useTranslation} from "react-i18next"

interface IWindow {
  focusWindow: any
  label: any
  manifest: any
  window: any
  workspaceType: string
}

const useStyles = makeStyles(theme => ({
  companionAreaBottom: {
    display: 'flex',
    flex: '0',
    flexBasis: 'auto',
    minHeight: 0,
  },
  companionAreaRight: {
    display: 'flex',
    flex: '0',
    minHeight: 0,
  },
  middle: {
    display: 'flex',
    flex: '1',
    flexDirection: 'row',
    minHeight: 0,
  },
  middleLeft: {
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
    minHeight: 0,
  },
  primaryWindow: {
    display: 'flex',
    flex: '1',
    height: '300px',
    minHeight: 0,
    position: 'relative',
  },
  thumbnailArea: {
    backgroundColor: (theme as any).palette.primary.dark,
  },
  thumbnailAreaBottom: {
  },
  thumbnailAreaRight: {
    minWidth: 100,
  },
  window: {
    backgroundColor: (theme as any).palette.primary.dark,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: 0,
    overflow: 'hidden',
    width: '100%',
  },
}));

export const Window: React.FC<any> = (props): ReactElement => {
  const {t} = useTranslation()
  const classes = useStyles({})
  const {manifest, window, workspaceType, focusWindow, label} = props;
  const context = useContext(ModernMosaicWindowContext);

  /**
   * wrappedTopBar - will conditionally wrap a WindowTopBar for needed
   * additional functionality based on workspace type
   */
  const wrappedTopBar = () => {
    const topBar = (
      <div>
        <WindowTopBar
          manifest={manifest}
          windowId={window.id}
        />
      </div>
    );
    if (workspaceType === 'mosaic' && window.maximized === false) {
      return context.mosaicWindowActions.connectDragSource(topBar);
    }
    return topBar;
  }

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
