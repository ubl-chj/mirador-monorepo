import Badge from '@material-ui/core/Badge'
import Drawer from '@material-ui/core/Drawer'
import Fab from '@material-ui/core/Fab'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import AddIcon from '@material-ui/icons/Add'
import ClearIcon from '@material-ui/icons/Clear'
import Star from '@material-ui/icons/Star'
import React, {EventHandler} from 'react'
import {WorkspaceSettingsMenu} from './WorkspaceSettingsMenu'
import {updateConfig} from '@mirador/core'

interface IWorkspaceControlPanel {
  currentLanguage: string,
  isWorkspaceAddVisible: boolean,
  languages: {
    current: string,
    label: string,
    locale: string
  },
  onClose: EventHandler<any>,
  open: boolean,
  setWorkspaceAddVisibility: Function
  t: Function,
  updateConfig: typeof updateConfig,
  windows: {},
  workspaceType: string
}

export const WorkspaceControlPanelComponent: React.FC<IWorkspaceControlPanel> = (props) => {
  const windowCount = props.windows && Object.keys(props.windows).length
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      PaperProps={{ style: { top: '65px' } }}
      open={true}
    >
      <List>
        <ListItem alignItems="flex-start">
          <Fab
            color="primary"
            id="addBtn"
            onClick={() => { props.setWorkspaceAddVisibility(!props.isWorkspaceAddVisible) }} // tslint:disable-line
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
              <Star />
            </Badge>
          </IconButton>
        </ListItem>
      </List>
      <WorkspaceSettingsMenu {...props}/>
    </Drawer>
  )
}
