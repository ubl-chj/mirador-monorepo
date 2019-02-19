import Drawer from '@material-ui/core/Drawer'
import Fab from '@material-ui/core/Fab'
import ListItem from '@material-ui/core/ListItem'
import AddIcon from '@material-ui/icons/Add'
import ClearIcon from '@material-ui/icons/Clear'
import {setWorkspaceAddVisibility} from '@mirador/react-component'
import React from 'react'
import {connect} from 'react-redux'

/**
 * Provides the panel responsible for controlling the entire workspace
 */
const WorkspaceControlPanel = (props) => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      PaperProps={{ style: { position: 'absolute' } }}
      open={true}
    >
      <ListItem>
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
    </Drawer>
  )
}

const mapStateToProps = (state) => (
  {
    isWorkspaceAddVisible: state.workspace.isWorkspaceAddVisible,
  }
)

const mapDispatchToProps = { setWorkspaceAddVisibility }

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceControlPanel)
