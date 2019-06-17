import {Badge, IconButton, ListItem, ListItemText, Menu, MenuItem} from '@material-ui/core'
import React, {ReactElement, useState} from 'react'
import {focusWindowWorker, getFocusedWindowId, getWindows} from "@mirador/core"
import {IWindows} from "mirador-core-model"
import Star from '@material-ui/icons/Star'
import {useDispatch} from 'react-redux'
import {useListItemTextStyles} from '../../hooks'
import {useTranslation} from 'react-i18next'

export const WindowListMenu: React.FC<any> = (props): ReactElement => {
  const [anchorEl, setAnchorEl] = useState()
  const classes: any = useListItemTextStyles
  const {t} = useTranslation()
  const windows: IWindows = getWindows()
  const focusedWindowId = getFocusedWindowId()
  const windowCount = windows && Object.keys(windows).length
  const dispatch = useDispatch()

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
          onClick={() => dispatch(focusWindowWorker({windowId: window.id}))}
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
