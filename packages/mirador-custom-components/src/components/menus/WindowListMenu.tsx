import React, {ReactElement, useState} from 'react'
import Badge from '@material-ui/core/Badge'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Star from '@material-ui/icons/Star'
import {focusWindowWorker} from "@mirador/core"
import {useListItemTextStyles} from '../../hooks'
import {useTranslation} from 'react-i18next'

interface IWindowListMenu {
  focusWindowWorker: typeof focusWindowWorker
  focusedWindowId: any
  manifests: {}
  titles: {}
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
  const {focusWindowWorker, focusedWindowId, windows} = props
  const windowCount = windows && Object.keys(windows).length

  const handleClick: any = (e): void => {
    if (e && e.currentTarget) {
      setAnchorEl(e.currentTarget)
    } else {
      setAnchorEl(null)
    }
  }

  const titleContent = (window) => {
    const { titles } = props;
    return titles[window.id] || t('untitled');
  }

  const buildMenuItems = (): any => {
    return Object.values(windows).map((window) => (
      <MenuItem
        button={true}
        component='div'
        key={window.id}
        onClick={() => handleClick(null)}
        selected={focusedWindowId === window.id}
      >
        <ListItem
          button={true}
          component='div'
          divider={true}
          onClick={() => focusWindowWorker({windowId: window.id})}
        >
          <ListItemText className={classes.primary}>
            {titleContent(window)}
          </ListItemText>
        </ListItem>
      </MenuItem>
    ))
  }

  return (
    <ListItem
      alignItems="flex-start"
      button={true}
      component='div'
    >
      <IconButton
        href=''
        onClick={(e) => handleClick(e)}
        style={{padding: '10px'}}
      >
        <Badge badgeContent={windowCount}>
          <Star />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
        id="windowlist-menu"
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
