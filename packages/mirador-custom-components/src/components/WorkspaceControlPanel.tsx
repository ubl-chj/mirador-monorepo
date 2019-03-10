import React, {EventHandler, ReactElement} from 'react'
import AddIcon from '@material-ui/icons/Add'
import Badge from '@material-ui/core/Badge'
import Bookmark from '@material-ui/icons/Bookmark'
import ClearIcon from '@material-ui/icons/Clear'
import Drawer from '@material-ui/core/Drawer'
import Fab from '@material-ui/core/Fab'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import {WorkspaceSettingsMenu} from './menus'
import {updateConfig} from '@mirador/core'

interface IWorkspaceControlPanel {
  currentLanguage: string,
  discovery: {
    currentIndex: string,
    indices: {}
  },
  isWorkspaceAddVisible: boolean,
  languages: {
    current: string,
    label: string,
    locale: string
  },
  onClose: EventHandler<any>,
  open: boolean,
  setWorkspaceAddVisibility: Function
  updateConfig: typeof updateConfig,
  windows: {},
  workspaceType: string
}

export const WorkspaceControlPanelComponent: React.FC<IWorkspaceControlPanel> = (props): ReactElement => {
  const windowCount = props.windows && Object.keys(props.windows).length
  return (
    <Drawer
      PaperProps={{ style: { top: '65px' } }}
      anchor="left"
      open={true}
      variant="permanent"
    >
      <List>
        <ListItem alignItems="flex-start">
          <Fab
            color="primary"
            id="addBtn"
            onClick={() => { props.setWorkspaceAddVisibility(!props.isWorkspaceAddVisible) }}
          >
            {
              props.isWorkspaceAddVisible
                ? <ClearIcon />
                : <AddIcon />
            }
          </Fab>
        </ListItem>
        <ListItem alignItems="flex-start">
          <IconButton style={{padding: '16px'}}>
            <Badge badgeContent={windowCount}>
              <Bookmark />
            </Badge>
          </IconButton>
        </ListItem>
      </List>
      <WorkspaceSettingsMenu {...props}/>
    </Drawer>
  )
}
