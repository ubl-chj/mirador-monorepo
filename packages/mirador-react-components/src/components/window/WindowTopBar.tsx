import React, {ReactElement} from 'react';
import {WindowMaxIcon, WindowMinIcon} from '../icons';
import AppBar from '@material-ui/core/AppBar';
import CloseIcon from '@material-ui/icons/CloseSharp';
import Info from '@material-ui/icons/Info';
import MiradorMenuButton from '../../containers/MiradorMenuButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import WindowTopMenuButton from '../../containers/window/top-menu/WindowTopMenuButton';
import classNames from 'classnames';
import {makeStyles} from "@material-ui/styles"
import ns from '../../config/css-ns';
import {useTranslation} from "react-i18next"

interface IWindowTopBar {
  removeWindow: any
  windowId: string
  toggleWindowSideBar: any
  manifest: any
  manifestTitle: string
  maximizeWindow: any
  maximized: boolean
  minimizeWindow: any
  focused: boolean
  allowClose: boolean
  allowMaximize?: boolean
}

const useStyles = makeStyles(theme => ({
  focused: {
    borderTop: `4px solid ${(theme as any).palette.focused.main}`,
  },
  title: {
    ...(theme as any).typography.h6,
    flexGrow: 1,
    paddingLeft: (theme as any).spacing(0.5),
  },
  windowTopBarStyle: {
    '&$focused': {
      borderTop: `4px solid ${(theme as any).palette.focused.main}`,
    },
    backgroundColor: (theme as any).palette.primary.light,
    minHeight: 32,
    paddingLeft: (theme as any).spacing(0.5),
    paddingRight: (theme as any).spacing(0.5),
  },
}));

/**
 * WindowTopBar
 */
export const WindowTopBar: React.FC<any> = (props): ReactElement => {
  const classes = useStyles({})
  const {t} = useTranslation()
  const {removeWindow, windowId, toggleWindowSideBar, manifestTitle,
    maximizeWindow, maximized, minimizeWindow, focused, allowClose = true, allowMaximize = true,
  } = props;
  return (
    <AppBar
      className={classNames(classes.windowTopBarStyle, focused ? classes.focused : null, ns('window-top-bar'))}
      color="secondary"
      position="static"
    >
      <Toolbar disableGutters variant="dense">
        <WindowTopMenuButton
          className={ns('window-menu-btn')}
          windowId={windowId}
        />
        <Typography className={classes.title} noWrap variant="h2">
          {manifestTitle}
        </Typography>
        <MiradorMenuButton
          aria-label={t('toggleWindowSideBar')}
          color="inherit"
          onClick={toggleWindowSideBar}
          style={{marginRight: 20, padding: 8}}
        >
          <Info />
        </MiradorMenuButton>
        {allowMaximize && (
          <MiradorMenuButton
            aria-label={(maximized ? t('minimizeWindow') : t('maximizeWindow'))}
            className={ns('window-maximize')}
            color="inherit"
            onClick={(maximized ? minimizeWindow : maximizeWindow)}
          >
            {(maximized ? <WindowMinIcon /> : <WindowMaxIcon />)}
          </MiradorMenuButton>
        )}
        {allowClose && (
          <MiradorMenuButton
            aria-label={t('closeWindow')}
            className={ns('window-close')}
            color="inherit"
            onClick={removeWindow}
          >
            <CloseIcon />
          </MiradorMenuButton>
        )}
      </Toolbar>
    </AppBar>
  );
}
