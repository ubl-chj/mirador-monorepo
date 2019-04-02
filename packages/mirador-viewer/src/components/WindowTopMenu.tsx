import React, {ReactElement} from 'react';
import Menu from '@material-ui/core/Menu';
import WindowThumbnailSettings from '../containers/WindowThumbnailSettings';
import WindowViewSettings from '../containers/WindowViewSettings';
import ns from '../config/css-ns';

interface IWindowTopMenu {
  containerId: string
  handleClose: any
  anchorEl: any
  windowId: string
}
/**
 */
export const WindowTopMenu: React.FC<IWindowTopMenu> = (props): ReactElement => {
  const {containerId, handleClose, anchorEl, windowId} = props;

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom',
        }}
        container={document.querySelector(`#${containerId} .${ns('viewer')}`)}
        disableAutoFocusItem
        getContentAnchorEl={null}
        id={`window-menu_${windowId}`}
        onClose={handleClose}
        open={Boolean(anchorEl)}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
      >
        <WindowViewSettings handleClose={handleClose} windowId={windowId} />
        <WindowThumbnailSettings handleClose={handleClose} windowId={windowId} />
      </Menu>
    </>
  );
}
