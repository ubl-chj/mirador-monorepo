import React, {ReactElement} from 'react';
import {ThumbnailNavigationBottomIcon, ThumbnailNavigationRightIcon} from './icons';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuItem from '@material-ui/core/MenuItem';
import ThumbnailsOffIcon from '@material-ui/icons/CropDinSharp';

interface IWindowThumbnailSettings {
  classes: any
  handleClose: any
  setWindowThumbnailPosition
  t: any
  thumbnailNavigationPosition: string
  windowId: string
}

/**
 *
 */
export const WindowThumbnailSettings: React.FC<IWindowThumbnailSettings> = (props): ReactElement => {
  const { classes, handleClose, t, thumbnailNavigationPosition, windowId, setWindowThumbnailPosition } = props;

  const handleChange = (e) => {
    setWindowThumbnailPosition(windowId, e);
  }

  return (
    <>
      <ListSubheader role="presentation" tabIndex={-1}>{t('thumbnails')}</ListSubheader>

      <MenuItem className={classes.MenuItem} onClick={() => { handleChange('off'); handleClose(); }}>
        <FormControlLabel
          classes={{ label: thumbnailNavigationPosition === 'off' ? classes.selectedLabel : classes.optionLabel }}
          control={
            <ThumbnailsOffIcon color={thumbnailNavigationPosition === 'off' ? 'primary' : 'inherit'} />
          }
          label={t('off')}
          labelPlacement="bottom"
          value="off"
        />
      </MenuItem>
      <MenuItem className={classes.MenuItem} onClick={() => { handleChange('far-bottom'); handleClose(); }}>
        <FormControlLabel
          classes={{ label: thumbnailNavigationPosition === 'far-bottom' ? classes.selectedLabel : classes.optionLabel }}
          control={
            <ThumbnailNavigationBottomIcon color={thumbnailNavigationPosition === 'far-bottom' ? 'primary' : 'inherit'} nativeColor='gray'/>
          }
          label={t('bottom')}
          labelPlacement="bottom"
          value="far-bottom"
        />
      </MenuItem>
      <MenuItem className={classes.MenuItem} onClick={() => { handleChange('far-right'); handleClose(); }}>
        <FormControlLabel
          classes={{ label: thumbnailNavigationPosition === 'far-right' ? classes.selectedLabel : classes.optionLabel }}
          control={
            <ThumbnailNavigationRightIcon color={thumbnailNavigationPosition === 'far-right' ? 'primary' : 'inherit'} nativeColor='gray' />
          }
          label={t('right')}
          labelPlacement="bottom"
          value="far-right"
        />
      </MenuItem>
    </>
  );
}
