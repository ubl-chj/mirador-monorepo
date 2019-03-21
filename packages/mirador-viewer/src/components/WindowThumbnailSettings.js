import React, { Component } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuItem from '@material-ui/core/MenuItem';
import ThumbnailsOffIcon from '@material-ui/icons/CropDinSharp';
import PropTypes from 'prop-types';
import ThumbnailNavigationBottomIcon from './icons/ThumbnailNavigationBottomIcon';
import ThumbnailNavigationRightIcon from './icons/ThumbnailNavigationRightIcon';
/**
 *
 */
export class WindowThumbnailSettings extends Component {
  /**
   * constructor -
   */
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * @private
   */
  handleChange(value) {
    const { windowId, setWindowThumbnailPosition } = this.props;

    setWindowThumbnailPosition(windowId, value);
  }

  /**
   * render
   *
   * @return {type}  description
   */
  render() {
    const {
      classes, handleClose, t, thumbnailNavigationPosition,
    } = this.props;

    return (
      <>
        <ListSubheader role="presentation" tabIndex="-1">{t('thumbnails')}</ListSubheader>

        <MenuItem className={classes.MenuItem} onClick={() => { this.handleChange('off'); handleClose(); }}>
          <FormControlLabel
            value="off"
            classes={{ label: thumbnailNavigationPosition === 'off' ? classes.selectedLabel : classes.optionLabel }}
            control={
              <ThumbnailsOffIcon nativeColor='gray' color={thumbnailNavigationPosition === 'off' ? 'primary' : 'inherit'} />
            }
            label={t('off')}
            labelPlacement="bottom"
          />
        </MenuItem>
        <MenuItem className={classes.MenuItem} onClick={() => { this.handleChange('far-bottom'); handleClose(); }}>
          <FormControlLabel
            value="far-bottom"
            classes={{ label: thumbnailNavigationPosition === 'far-bottom' ? classes.selectedLabel : classes.optionLabel }}
            control={
              <ThumbnailNavigationBottomIcon nativeColor='gray' color={thumbnailNavigationPosition === 'far-bottom' ? 'primary' : 'inherit'} />
            }
            label={t('bottom')}
            labelPlacement="bottom"
          />
        </MenuItem>
        <MenuItem className={classes.MenuItem} onClick={() => { this.handleChange('far-right'); handleClose(); }}>
          <FormControlLabel
            value="far-right"
            classes={{ label: thumbnailNavigationPosition === 'far-right' ? classes.selectedLabel : classes.optionLabel }}
            control={
              <ThumbnailNavigationRightIcon nativeColor='gray' color={thumbnailNavigationPosition === 'far-right' ? 'primary' : 'inherit'} />
            }
            label={t('right')}
            labelPlacement="bottom"
          />
        </MenuItem>
      </>
    );
  }
}

WindowThumbnailSettings.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  handleClose: PropTypes.func,
  setWindowThumbnailPosition: PropTypes.func.isRequired,
  t: PropTypes.func,
  thumbnailNavigationPosition: PropTypes.string.isRequired,
  windowId: PropTypes.string.isRequired,
};
WindowThumbnailSettings.defaultProps = {
  handleClose: () => {},
  t: key => key,
};
