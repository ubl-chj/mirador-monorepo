import React, {useState} from 'react'
import Menu from '@material-ui/core/Menu'
import SettingsIcon from '@material-ui/icons/SettingsSharp'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ViewQuiltIcon from '@material-ui/icons/ViewQuilt'
import Typography from '@material-ui/core/Typography'
import {WorkspaceSelectionDialog} from './WorkspaceSelectionDialog'

/**
 *
 * @param props
 * @constructor
 */
export const WorkspaceSettingsMenu: React.FC<any> = (props) => {
  const [anchorEl, setAnchorEl] = useState()
  const {t} = props

  const handleClick: any = (e) => {
    if (e && e.currentTarget) {
      setAnchorEl(e.currentTarget)
    } else {
      setAnchorEl(null)
    }
  }

  return (
    <>
      <IconButton
        color='default'
        id='menuBtn'
        aria-haspopup="true"
        onClick={(e) => handleClick(e)}
        aria-owns={anchorEl ? 'workspace-menu' : undefined}
      >
        <SettingsIcon />
      </IconButton>
      <Menu
        id="workspace-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleClick(null)}
      >
        <MenuItem
          aria-haspopup="true"
          onClick={() => handleClick(null)}
          aria-owns={anchorEl ? 'workspace-selection' : undefined}
        >
          <ListItemIcon>
            <ViewQuiltIcon/>
          </ListItemIcon>
          <Typography variant="inherit">{t('selectWorkspaceMenu')}</Typography>
        </MenuItem>
      </Menu>
     <WorkspaceSelectionDialog
       open={Boolean(anchorEl)}
       onClose={() => handleClick(null)} {...props} />
    </>
  )
}

