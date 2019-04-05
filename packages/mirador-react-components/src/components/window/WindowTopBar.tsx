import React, {ReactElement} from 'react';
import AppBar from '@material-ui/core/AppBar';
import CloseIcon from '@material-ui/icons/CloseSharp';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExitSharp';
import FullscreenIcon from '@material-ui/icons/FullscreenSharp';
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
  manifestTitle: string
  maximizeWindow: any
  maximized: boolean
  minimizeWindow: any
  focused: boolean
  allowClose: boolean
  allowMaximize: boolean
}

const useStyles = makeStyles(theme => ({
  focused: {
    borderTop: `4px solid ${theme.palette.focused.main}`,
  },
  title: {
    ...theme.typography.h6,
    flexGrow: 1,
    paddingLeft: theme.spacing(0.5),
  },
  windowTopBarStyle: {
    '&$focused': {
      borderTop: `4px solid ${theme.palette.focused.main}`,
    },
    backgroundColor: theme.palette.primary.light,
    minHeight: 32,
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
  },
}));

/**
 * WindowTopBar
 */
export const WindowTopBar: React.FC<IWindowTopBar> = (props): ReactElement => {
  const classes = useStyles()
  const {t} = useTranslation()
  const {removeWindow, windowId, toggleWindowSideBar, manifestTitle,
    maximizeWindow, maximized, minimizeWindow, focused, allowClose, allowMaximize,
  } = props;
  return (
    <AppBar
      className={classNames(classes.windowTopBarStyle, focused ? classes.focused : null, ns('window-top-bar'))}
      color="secondary"
      position="static"
    >
      <Toolbar disableGutters variant="dense">
        <MiradorMenuButton
          aria-label={t('toggleWindowSideBar')}
          color="inherit"
          onClick={toggleWindowSideBar}
          style={{marginRight: 20, padding: 8}}
        >
          <Info />
        </MiradorMenuButton>
        <Typography className={classes.title} noWrap variant="h2">
          {manifestTitle}
        </Typography>
        <WindowTopMenuButton
          className={ns('window-menu-btn')}
          windowId={windowId}
        />
        {allowMaximize && (
          <MiradorMenuButton
            aria-label={(maximized ? t('minimizeWindow') : t('maximizeWindow'))}
            className={ns('window-maximize')}
            color="inherit"
            onClick={(maximized ? minimizeWindow : maximizeWindow)}
          >
            {(maximized ? <FullscreenExitIcon /> : <FullscreenIcon />)}
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
