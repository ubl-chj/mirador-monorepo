import React, { Component } from 'react';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import MoreVertIcon from '@material-ui/icons/MoreVertSharp';
import WindowTopMenu from '../containers/WindowTopMenu';

interface IWindowTopMenuButton {
  classes: any
  t: any
  windowId: string
}
/**
 */
export class WindowTopMenuButton extends Component<IWindowTopMenuButton> {
  public state: any

  /**
   * constructor -
   */
  public constructor(props) {
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
  private handleMenuClick(event) {
    this.setState({
      anchorEl: event.currentTarget,
    });
  }

  /**
   * @private
   */
  private handleMenuClose() {
    this.setState({
      anchorEl: null,
    });
  }

  /**
   * render
   * @return
   */
  public render() {
    const { classes, t, windowId } = this.props;
    const { anchorEl } = this.state;

    return (
      <>
        <MiradorMenuButton
          aria-haspopup="true"
          aria-label={t('windowMenu')}
          aria-owns={anchorEl ? `window-menu_${windowId}` : undefined}
          className={anchorEl ? classes.ctrlBtnSelected : null}
          color="inherit"
          onClick={this.handleMenuClick}
        >
          <MoreVertIcon />
        </MiradorMenuButton>
        <WindowTopMenu
          anchorEl={anchorEl}
          handleClose={this.handleMenuClose}
          windowId={windowId}
        />
      </>
    );
  }
}
