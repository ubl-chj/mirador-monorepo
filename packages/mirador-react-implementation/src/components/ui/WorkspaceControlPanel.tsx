import Badge from '@material-ui/core/Badge'
import Drawer from '@material-ui/core/Drawer'
import Fab from '@material-ui/core/Fab'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import ClearIcon from '@material-ui/icons/Clear'
import Star from '@material-ui/icons/Star'
import {setWorkspaceAddVisibility} from '@mirador/core'
import React from 'react'
import {connect} from 'react-redux'
/**
 * Provides the panel responsible for controlling the entire workspace
 */
const WorkspaceControlPanel = (props) => {
  const windowCount = props.windows && Object.keys(props.windows).length
  return (
    <MuiThemeProvider theme={createMuiTheme(props.theme)}>
      <Drawer
        variant="permanent"
        anchor="left"
        PaperProps={{ style: { position: 'absolute' } }}
        open={true}
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
                <Star />
              </Badge>
            </IconButton>
          </ListItem>
        </List>
      </Drawer>
    </MuiThemeProvider>
  )
}

const mapStateToProps = (state) => (
  {
    isWorkspaceAddVisible: state.workspace.isWorkspaceAddVisible,
    theme: state.config.theme,
    windows: state.windows,
  }
)

const mapDispatchToProps = { setWorkspaceAddVisibility }

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceControlPanel)
