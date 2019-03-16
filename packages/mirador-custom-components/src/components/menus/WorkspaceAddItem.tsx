import React, {ReactElement} from "react"
import AddIcon from '@material-ui/icons/Add'
import ClearIcon from '@material-ui/icons/Clear'
import Fab from '@material-ui/core/Fab'
import ListItem from '@material-ui/core/ListItem'
import {setWorkspaceAddVisibility} from "@mirador/core"

interface IWorkspaceAddItem {
  isWorkspaceAddVisible: boolean,
  setWorkspaceAddVisibility: typeof setWorkspaceAddVisibility
}
export const WorkspaceAddItem: React.FC<IWorkspaceAddItem> = (props): ReactElement => {
  return (
    <ListItem
      alignItems="flex-start"
    >
      <Fab
        color="primary"
        id="addBtn"
        onClick={() => { props.setWorkspaceAddVisibility(!props.isWorkspaceAddVisible) }}
        size="small"
      >
        {
          props.isWorkspaceAddVisible
            ? <ClearIcon />
            : <AddIcon />
        }
      </Fab>
    </ListItem>
  )
}
