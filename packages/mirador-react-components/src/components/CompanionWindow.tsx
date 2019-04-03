import React, {ReactElement} from 'react';
import {ThumbnailNavigationBottomIcon, ThumbnailNavigationRightIcon} from './icons';
import CloseIcon from '@material-ui/icons/CloseSharp';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import OpenInNewIcon from '@material-ui/icons/OpenInNewSharp';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ns from '../config/css-ns';

interface ICompanionWindow {
  classes: any
  paperClassName: any
  id: string
  removeCompanionWindow: any
  updateCompanionWindow: any
  isDisplayed: boolean
  position: any
  t: any
  windowId: string
  title: string
  titleControls: any
}
/**
 * CompanionWindow
 */
export const CompanionWindow: React.FC<ICompanionWindow> = (props): ReactElement => {
  const {
    classes, paperClassName, id, removeCompanionWindow, updateCompanionWindow, isDisplayed,
    position, t, windowId, title, children, titleControls,
  } = props;

  return (
    <Paper
      aria-label={title}
      className={[classes.root, position === 'bottom' ? classes.horizontal : classes.vertical, classes[`companionWindow-${position}`], ns(`companion-window-${position}`), paperClassName].join(' ')}
      component="aside"
      square
      style={{
        display: isDisplayed ? null : 'none',
        order: position === 'left' ? -1 : null,
      }}
    >
      <Toolbar className={[classes.toolbar, position === 'left' ? classes.leftPadding : undefined, ns('companion-window-header')].join(' ')} disableGutters>
        <div style={{ flexGrow: 1, paddingLeft: 16 }}>
          <Typography className={classes.windowSideBarTitle} variant="h3">
            {title}
          </Typography>
          <div className={ns('companion-window-title-controls')}>
            {titleControls}
          </div>
        </div>
        {
          position === 'left'
            ? updateCompanionWindow
              && (
                <MiradorMenuButton
                  aria-label={t('openInCompanionWindow')}
                  onClick={() => { updateCompanionWindow({ id, position: 'right' }, windowId); }}
                >
                  <OpenInNewIcon />
                </MiradorMenuButton>
              )
            : (
              <>
                {
                  updateCompanionWindow && (
                    <MiradorMenuButton
                      aria-label={position === 'bottom' ? t('moveCompanionWindowToRight') : t('moveCompanionWindowToBottom')}
                      onClick={() => { updateCompanionWindow({ id, position: position === 'bottom' ? 'right' : 'bottom' }, windowId) }}
                      wrapperClassName={classes.positionButton}
                    >
                      {position === 'bottom' ? <ThumbnailNavigationRightIcon /> : <ThumbnailNavigationBottomIcon />}
                    </MiradorMenuButton>
                  )
                }
                <MiradorMenuButton
                  aria-label={t('closeCompanionWindow')}
                  onClick={() => { removeCompanionWindow({id, windowId}) }}
                >
                  <CloseIcon />
                </MiradorMenuButton>
              </>
            )
        }
      </Toolbar>
      <Paper className={classes.content} elevation={0}>
        {children}
      </Paper>
    </Paper>
  );
}
