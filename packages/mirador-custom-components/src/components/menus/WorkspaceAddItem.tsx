import React, {ReactElement} from "react"
import ClearIcon from '@material-ui/icons/Clear'
import Fab from '@material-ui/core/Fab'
import ListItem from '@material-ui/core/ListItem'
import Search from '@material-ui/icons/Search'
import {getIsWorkspaceAddVisible, setWorkspaceAddVisibility} from "@mirador/core"
import {useDispatch} from 'react-redux'

export const WorkspaceAddItem: React.FC<any> = (): ReactElement => {
  const isWorkspaceAddVisible = getIsWorkspaceAddVisible()
  const dispatch = useDispatch()

  return (
    <ListItem
      button={false}
      component='li'
    >
      <Fab
        color="primary"
        href=''
        id="addBtn"
        onClick={() => dispatch(setWorkspaceAddVisibility({isWorkspaceAddVisible: !isWorkspaceAddVisible})) }
        size="small"
      >
        {
          isWorkspaceAddVisible
            ? <ClearIcon />
            : <Search />
        }
      </Fab>
    </ListItem>
  )
}
