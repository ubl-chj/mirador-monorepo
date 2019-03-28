import {FullScreenButton, WindowListMenu, WorkspaceAddItem, WorkspaceSettingsMenu} from './menus'
import React, {EventHandler, ReactElement} from 'react'
import {focusWindow, setWorkspaceAddVisibility, setWorkspaceFullscreen, updateConfig} from '@mirador/core'
import Drawer from '@material-ui/core/Drawer'
import { I18nextProvider } from 'react-i18next'
import List from '@material-ui/core/List'
import {ThemeProvider} from "@material-ui/styles"
import {createMuiTheme} from "@material-ui/core"
import i18n from '@mirador/i18n'
import {localConfig} from '@mirador/configuration'

interface IWorkspaceControlPanel {
  currentLanguage: string,
  discovery: {
    currentIndex: string,
    indices: {}
  },
  focusWindow: typeof focusWindow
  focusedWindowId: string
  isFullscreenEnabled: boolean,
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
  const defaultTheme = localConfig.theme
  const theme = createMuiTheme(defaultTheme)

  return (
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
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
            <FullScreenButton {...props}/>
          </List>
        </Drawer>
      </I18nextProvider>
    </ThemeProvider>
  )
}
