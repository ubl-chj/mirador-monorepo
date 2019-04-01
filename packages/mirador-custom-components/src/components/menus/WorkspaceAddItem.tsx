import React, {ReactElement} from "react"
import AddIcon from '@material-ui/icons/Add'
import ClearIcon from '@material-ui/icons/Clear'
import Fab from '@material-ui/core/Fab'
import ListItem from '@material-ui/core/ListItem'

interface IWorkspaceAddItem {
  isWorkspaceAddVisible: boolean,
  setWorkspaceAddVisibility: any
}
export const WorkspaceAddItem: React.FC<IWorkspaceAddItem> = (props): ReactElement => {
  return (
    <ListItem
      button={false}
      component='li'
    >
      <Fab
        color="primary"
        href=''
        id="addBtn"
        onClick={() => props.setWorkspaceAddVisibility({isWorkspaceAddVisible: !props.isWorkspaceAddVisible}) }
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
