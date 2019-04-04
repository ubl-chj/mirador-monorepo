import {FullScreenButton, WindowListMenu, WorkspaceAddItem, WorkspaceSettingsMenu} from './menus'
import React, {EventHandler, ReactElement} from 'react'
import {focusWindowWorker, setWorkspaceAddVisibility, setWorkspaceFullscreen, updateConfig} from '@mirador/core'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'

interface IWorkspaceControlPanel {
  currentLanguage: string,
  discovery: {
    currentIndex: string,
    indices: {}
  },
  focusWindowWorker: typeof focusWindowWorker
  focusedWindowId: string
  enabled: boolean,
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
  setWorkspaceFullscreen: typeof setWorkspaceFullscreen,
  titles: {}
  updateConfig: typeof updateConfig,
  windows: {},
  workspaceType: string
}

export const WorkspaceControlPanelComponent: React.FC<IWorkspaceControlPanel> = (props): ReactElement => {
  return (
    <Drawer
      PaperProps={{ style: { top: '64px', width: '76px', zIndex: 500 } }}
      anchor="left"
      open={true}
      variant="permanent"
    >
      <List>
        <WorkspaceAddItem {...props}/>
        <WindowListMenu {...props}/>
        <WorkspaceSettingsMenu {...props}/>
        <FullScreenButton {...props}/>
      </List>
    </Drawer>
  )
}
