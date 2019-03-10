import React, {ReactElement, useState} from 'react'
import Badge from '@material-ui/core/Badge'
import Bookmark from '@material-ui/icons/Bookmark'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import {focusWindow} from "@mirador/core"
import {useListItemTextStyles} from '../../hooks'
import {useTranslation} from 'react-i18next'

interface IWindowListMenu {
  focusWindow: typeof focusWindow
  manifests: {}
  windows: {
    [key: string]: {
      id: string
    }
  }
}
export const WindowListMenu: React.FC<IWindowListMenu> = (props): ReactElement => {
  const [anchorEl, setAnchorEl] = useState()
  const classes: any = useListItemTextStyles
  const {t} = useTranslation()
  const {focusWindow, windows} = props
  const windowCount = windows && Object.keys(windows).length

  const handleClick: any = (e): void => {
    if (e && e.currentTarget) {
      setAnchorEl(e.currentTarget)
    } else {
      setAnchorEl(null)
    }
  }

  const titleContent = (window): string => {
    const {manifests} = props
    if (window.manifestId
      && manifests[window.manifestId]
      && manifests[window.manifestId].manifestation) {
      return manifests[window.manifestId].manifestation.getLabel().map(label => label.value)[0]
    }
    return t('untitled')
  }

  const buildMenuItems = (): any => {
    return Object.values(windows).map((window) => (
      <MenuItem
        key={window.id}
        onClick={() => handleClick(null)}
      >
        <ListItem
          onClick={() => focusWindow(window.id)}
        >
          <ListItemText classes={{primary: classes.primary}}>
            {titleContent(window)}
          </ListItemText>
        </ListItem>
      </MenuItem>
    ))
  }

  return (
    <ListItem alignItems="flex-start">
      <IconButton
        onClick={(e) => handleClick(e)}
        style={{padding: '16px'}}
      >
        <Badge badgeContent={windowCount}>
          <Bookmark />
        </Badge>
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
        {
          buildMenuItems()
        }
      </Menu>
    </ListItem>
  )
}
