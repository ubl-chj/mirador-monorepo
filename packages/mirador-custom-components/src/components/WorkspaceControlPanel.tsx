import React, {EventHandler, ReactElement} from 'react'
import {WindowListMenu, WorkspaceAddItem, WorkspaceSettingsMenu} from './menus'
import {focusWindow, setWorkspaceAddVisibility, updateConfig} from '@mirador/core'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'

interface IWorkspaceControlPanel {
  currentLanguage: string,
  discovery: {
    currentIndex: string,
    indices: {}
  },
  focusWindow: typeof focusWindow
  focusedWindowId: string
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
      PaperProps={{ style: { top: '64px', width: '76px' } }}
      anchor="left"
      open={true}
      variant="permanent"
    >
      <List>
        <WorkspaceAddItem {...props}/>
        <WindowListMenu {...props}/>
        <WorkspaceSettingsMenu {...props}/>
      </List>
    </Drawer>
  )
}
