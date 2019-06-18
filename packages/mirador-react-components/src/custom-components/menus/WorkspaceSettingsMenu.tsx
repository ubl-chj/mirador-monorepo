import {IconButton, ListItem, ListItemIcon, ListItemText, Menu, MenuItem} from '@material-ui/core'
import {IndexSelectionDialog, LanguageSelectionDialog, WorkspaceSelectionDialog} from '.'
import {Language, Search, SettingsSharp, ViewQuilt} from '@material-ui/icons'
import React, {EventHandler, ReactElement, useState} from 'react'
import {updateConfig} from '@mirador/core'
import {useListItemTextStyles} from '../hooks'
import {useTranslation} from 'react-i18next'

interface IWorkspaceSettingsMenu {
  currentLanguage: string,
  discovery: {
    currentIndex: string,
    indices: {}
  },
  languages: {
    current: string,
    label: string,
    locale: string
  }
  onClose: EventHandler<any>,
  open: boolean,
  updateConfig: typeof updateConfig,
  workspaceType: string
}

/**
 *
 * @param props
 * @constructor
 */
export const WorkspaceSettingsMenu: React.FC<IWorkspaceSettingsMenu> = (props): ReactElement => {
  const [anchorEl, setAnchorEl] = useState()
  const [listItemState, setListItemState] = useState<any>({dialogIsOpen: false, selectedIndex: null})
  const classes: any = useListItemTextStyles
  const {t} = useTranslation()

  const handleClick: any = (e): void => {
    if (e && e.currentTarget) {
      setAnchorEl(e.currentTarget)
    } else {
      setAnchorEl(null)
    }
  }

  const handleListItemClick = (index): void => {
    setListItemState({dialogIsOpen: true, selectedIndex: index})
  }

  const menuItems = [
    {
      id: 'workspace-selection',
      index: 0,
      text: 'selectWorkspaceMenu'
    },
    {
      id: 'language',
      index: 1,
      text: 'language'
    },
    {
      id: 'indices',
      index: 2,
      text: 'indices'
    },
  ]

  const buildListItemIcon = (item): JSX.Element => {
    switch (item) {
      case 'workspace-selection':
        return <ViewQuilt/>
      case 'language':
        return <Language/>
      case 'indices':
        return <Search/>
    }
  }

  const buildMenuItems = (items): JSX.Element => {
    return items.map((item) =>
      <MenuItem
        aria-haspopup="true"
        aria-owns={anchorEl ? item.id : undefined}
        button={true}
        component='div'
        divider={true}
        key={item.id}
        onClick={() => handleClick(null)}
        selected={listItemState.selectedIndex === item.index}
      >
        <ListItem
          button={true}
          component='div'
          onClick={() => handleListItemClick(item.index)}
        >
          <ListItemIcon>
            {buildListItemIcon(item.id)}
          </ListItemIcon>
          <ListItemText classes={{primary: classes.primary}}>{t(item.text)}</ListItemText>
        </ListItem>
      </MenuItem>
    )
  }

  return (
    <ListItem
      button={true}
      component='div'
      style={{justifyContent: 'center'}}>
      <IconButton
        aria-haspopup="true"
        aria-owns={anchorEl ? 'settings-menu' : undefined}
        color='default'
        href=''
        id='menuBtn'
        onClick={(e) => handleClick(e)}
      >
        <SettingsSharp />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
        id="settings-menu"
        onClose={() => handleClick(null)}
        open={Boolean(anchorEl)}
        transformOrigin={{
          horizontal: 'left',
          vertical: 'top',
        }}
      >
        {buildMenuItems(menuItems)}
      </Menu>
      <IndexSelectionDialog
        onClose={() => setListItemState({dialogIsOpen: false})}
        open={listItemState.selectedIndex === 2 && listItemState.dialogIsOpen === true} {...props} />
      <WorkspaceSelectionDialog
        onClose={() => setListItemState({dialogIsOpen: false})}
        open={listItemState.selectedIndex === 0 && listItemState.dialogIsOpen === true} {...props} />
      <LanguageSelectionDialog
        onClose={() => setListItemState({dialogIsOpen: false})}
        open={listItemState.selectedIndex === 1 && listItemState.dialogIsOpen === true} {...props} />
    </ListItem>
  )
}

