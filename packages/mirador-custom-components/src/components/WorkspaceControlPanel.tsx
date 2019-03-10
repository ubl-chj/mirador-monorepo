import React, {EventHandler, ReactElement} from 'react'
import {WindowListMenu, WorkspaceSettingsMenu} from './menus'
import {focusWindow, setWorkspaceAddVisibility, updateConfig} from '@mirador/core'
import AddIcon from '@material-ui/icons/Add'
import ClearIcon from '@material-ui/icons/Clear'
import Drawer from '@material-ui/core/Drawer'
import Fab from '@material-ui/core/Fab'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

interface IWorkspaceControlPanel {
  currentLanguage: string,
  discovery: {
    currentIndex: string,
    indices: {}
  },
  focusWindow: typeof focusWindow
  isWorkspaceAddVisible: boolean,
  languages: {
    current: string,
    label: string,
    locale: string
  },
  manifests: {}
  onClose: EventHandler<any>,
  open: boolean,
  setWorkspaceAddVisibility: typeof setWorkspaceAddVisibility
  updateConfig: typeof updateConfig,
  windows: {},
  workspaceType: string
}

export const WorkspaceControlPanelComponent: React.FC<IWorkspaceControlPanel> = (props): ReactElement => {
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
        <WindowListMenu {...props}/>
        <WorkspaceSettingsMenu {...props}/>
      </List>
    </Drawer>
  )
}
