import React, {useState} from 'react'
import Menu from '@material-ui/core/Menu'
import SettingsIcon from '@material-ui/icons/SettingsSharp'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Language from '@material-ui/icons/Language'
import ViewQuiltIcon from '@material-ui/icons/ViewQuilt'
import Typography from '@material-ui/core/Typography'
import {LanguageSelectionDialog} from './LanguageSelectionDialog'
import {WorkspaceSelectionDialog} from './WorkspaceSelectionDialog'


interface IWorkspaceSettingsMenu {
  currentLanguage: string,
  languages: {
    current: string,
    label: string,
    locale: string
  }
  onClose: Function,
  open: boolean,
  t: Function,
  updateConfig: Function,
  workspaceType: string
}

/**
 *
 * @param props
 * @constructor
 */
export const WorkspaceSettingsMenu: React.FC<IWorkspaceSettingsMenu> = (props) => {
  const [anchorEl, setAnchorEl] = useState()
  const [listItemState, setListItemState] = useState<any>({dialogIsOpen: false, selectedIndex: 1})

  const {t} = props

  const handleClick: any = (e) => {
    if (e && e.currentTarget) {
      setAnchorEl(e.currentTarget)
    } else {
      setAnchorEl(null)
    }
  }

  const handleListItemClick = (index) => {
    setListItemState({dialogIsOpen: true, selectedIndex: index})
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
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem
          aria-haspopup="true"
          onClick={() => handleClick(null)}
          aria-owns={anchorEl ? 'workspace-selection' : undefined}
        >
          <ListItem
            button
            selected={listItemState.selectedIndex === 0}
            onClick={() => handleListItemClick(0)}
          >
            <ListItemIcon>
              <ViewQuiltIcon/>
            </ListItemIcon>
            <Typography variant="inherit">{t('selectWorkspaceMenu')}</Typography>
          </ListItem>
        </MenuItem>
        <MenuItem
          aria-haspopup="true"
          onClick={() => handleClick(null)}
          aria-owns={anchorEl ? 'language' : undefined}
        >
          <ListItem
            button
            selected={listItemState.selectedIndex === 1}
            onClick={() => handleListItemClick(1)}
          >
            <ListItemIcon>
              <Language/>
            </ListItemIcon>
            <Typography variant="inherit">{t('language')}</Typography>
          </ListItem>
        </MenuItem>
      </Menu>
     <WorkspaceSelectionDialog
       open={listItemState.selectedIndex === 0 && listItemState.dialogIsOpen === true}
       onClose={() => setListItemState({dialogIsOpen: false})} {...props} />
     <LanguageSelectionDialog
        open={listItemState.selectedIndex === 1 && listItemState.dialogIsOpen === true}
        onClose={() => setListItemState({dialogIsOpen: false})} {...props} />
    </>
  )
}

