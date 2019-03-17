import React, { Component } from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVertSharp';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import WindowTopMenu from '../containers/WindowTopMenu';
import { MiradorMenuButton } from './MiradorMenuButton';

/**
 */
export class WindowTopMenuButton extends Component {
  /**
   * constructor -
   */
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
  }

  /**
   * @private
   */
  handleMenuClick(event) {
    this.setState({
      anchorEl: event.currentTarget,
    });
  }

  /**
   * @private
   */
  handleMenuClose() {
    this.setState({
      anchorEl: null,
    });
  }

  /**
   * render
   * @return
   */
  render() {
    const { classes, t, windowId } = this.props;
    const { anchorEl } = this.state;

    return (
      <>
        <MiradorMenuButton
          aria-haspopup="true"
          aria-label={t('windowMenu')}
          aria-owns={anchorEl ? `window-menu_${windowId}` : undefined}
          className={classNames(anchorEl ? classes.ctrlBtnSelected : null)}
          color="inherit"
          onClick={this.handleMenuClick}
        >
          <MoreVertIcon />
        </MiradorMenuButton>
        <WindowTopMenu
          windowId={windowId}
          anchorEl={anchorEl}
          handleClose={this.handleMenuClose}
        />
      </>
    );
  }
}

WindowTopMenuButton.propTypes = {
  windowId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  t: PropTypes.func,
};

WindowTopMenuButton.defaultProps = {
  t: key => key,
};
