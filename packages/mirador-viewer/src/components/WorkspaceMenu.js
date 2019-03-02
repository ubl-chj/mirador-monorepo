import React, { Component } from 'react';
import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';
import LanguageIcon from '@material-ui/icons/Language';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LoupeIcon from '@material-ui/icons/Loupe';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import SaveAltIcon from '@material-ui/icons/SaveAltSharp';
import SettingsIcon from '@material-ui/icons/SettingsSharp';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import PropTypes from 'prop-types';
import LanguageSettings from '../containers/LanguageSettings';
import { NestedMenu } from './NestedMenu';
import WindowList from '../containers/WindowList';
import WorkspaceSettings from '../containers/WorkspaceSettings';
import WorkspaceExport from '../containers/WorkspaceExport';
import ns from '../config/css-ns';

/**
 */
export class WorkspaceMenu extends Component {
  /**
   * constructor -
   */
  constructor(props) {
    super(props);
    this.state = {
      windowList: {},
      toggleZoom: {},
      settings: {},
      exportWorkspace: {},
    };
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    this.handleMenuItemClose = this.handleMenuItemClose.bind(this);
  }

  /**
   * @private
   */
  handleMenuItemClick(item, event) {
    const obj = {};
    obj[item] = {};
    obj[item].open = true;
    obj[item].anchorEl = event.currentTarget;
    this.setState(obj);
  }

  /**
   * @private
   */
  handleMenuItemClose(item) {
    return (event) => {
      const obj = {};
      obj[item] = {};
      obj[item].open = false;
      obj[item].anchorEl = null;
      this.setState(obj);
    };
  }

  /**
   * @private
   */
  handleZoomToggleClick() {
    const { toggleZoomControls, showZoomControls } = this.props;
    toggleZoomControls(!showZoomControls);
  }

  /**
   * render
   * @return
   */
  render() {
    const {
      containerId, handleClose, anchorEl, t, showZoomControls,
    } = this.props;

    const {
      windowList,
      toggleZoom,
      settings,
      exportWorkspace,
    } = this.state;

    return (
      <>
        <Menu
          id="workspace-menu"
          container={document.querySelector(`#${containerId} .${ns('viewer')}`)}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            aria-haspopup="true"
            onClick={(e) => { this.handleMenuItemClick('windowList', e); handleClose(e); }}
            aria-owns={windowList.anchorEl ? 'window-list-menu' : undefined}
          >
            <ListItemIcon>
              <ViewHeadlineIcon />
            </ListItemIcon>
            <Typography varient="inherit">{t('listAllOpenWindows')}</Typography>
          </MenuItem>
          <Divider />
          <MenuItem
            aria-haspopup="true"
            onClick={(e) => { this.handleZoomToggleClick(e); handleClose(e); }}
            aria-owns={toggleZoom.anchorEl ? 'toggle-zoom-menu' : undefined}
          >
            <ListItemIcon>
              <LoupeIcon />
            </ListItemIcon>
            <Typography varient="inherit">
              { showZoomControls ? t('hideZoomControls') : t('showZoomControls') }
            </Typography>
          </MenuItem>

          <NestedMenu icon={<LanguageIcon />} label={t('language')}>
            <LanguageSettings afterSelect={handleClose} />
          </NestedMenu>

          <Divider />
          <MenuItem
            aria-haspopup="true"
            onClick={(e) => { this.handleMenuItemClick('settings', e); handleClose(e); }}
            aria-owns={settings.AnchorEl ? 'workspace-settings' : undefined}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <Typography varient="inherit">{t('settings')}</Typography>
          </MenuItem>
          <MenuItem
            aria-haspopup="true"
            onClick={(e) => { this.handleMenuItemClick('exportWorkspace', e); handleClose(e); }}
            aria-owns={exportWorkspace.AnchorEl ? 'workspace-export' : undefined}
          >
            <ListItemIcon>
              <SaveAltIcon />
            </ListItemIcon>
            <Typography varient="inherit">{t('downloadExportWorkspace')}</Typography>
          </MenuItem>
        </Menu>
        <WindowList
          anchorEl={windowList.anchorEl}
          open={Boolean(windowList.anchorEl)}
          handleClose={this.handleMenuItemClose('windowList')}
        />
        <WorkspaceSettings
          open={Boolean(toggleZoom.open)}
          handleClose={this.handleMenuItemClose('toggleZoom')}
        />
        <WorkspaceSettings
          open={Boolean(settings.open)}
          handleClose={this.handleMenuItemClose('settings')}
        />
        <WorkspaceExport
          open={Boolean(exportWorkspace.open)}
          handleClose={this.handleMenuItemClose('exportWorkspace')}
        />
      </>
    );
  }
}

WorkspaceMenu.propTypes = {
  containerId: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  toggleZoomControls: PropTypes.func,
  showZoomControls: PropTypes.bool,
  anchorEl: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  t: PropTypes.func,
};

WorkspaceMenu.defaultProps = {
  anchorEl: null,
  t: key => key,
  showZoomControls: false,
  toggleZoomControls: () => {},
};
