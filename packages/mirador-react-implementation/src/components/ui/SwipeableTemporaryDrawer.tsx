import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Home from '@material-ui/icons/Home'
import ImageOutlined from '@material-ui/icons/ImageOutlined'
import MenuIcon from '@material-ui/icons/MenuSharp'
import { withStyles } from '@material-ui/styles'
import React, {useState} from 'react'
import {Link} from 'react-router-dom'

const styles = {
  fullList: {
    width: 'auto',
  },
  list: {
    width: 250,
  },
}

const SwipeableTemporaryDrawer = (props) => {
  const [left, setLeft] = useState(false)

  const toggleDrawer = (open: boolean) => () => {
    setLeft(open)
  }

  const {classes} = props
  const sideList = (
    <div className={classes.list}>
      <List>
        <Link to='/'>
          <ListItem button={true} key='home'>
            <ListItemIcon>
              <Home/>
            </ListItemIcon>
            <ListItemText primary='Home' />
          </ListItem>
        </Link>
        <Link to='/view'>
          <ListItem button={true} key='mirador'>
            <ListItemIcon>
              <ImageOutlined/>
            </ListItemIcon>
            <ListItemText primary='Mirador' />
          </ListItem>
        </Link>
      </List>
      <Divider />
    </div>
  )

  return (
    <div>
      <IconButton
        onClick={toggleDrawer(true)}
      >
        <MenuIcon
          style={{color: 'white', marginLeft: '3px'}}
        />
      </IconButton>
      <SwipeableDrawer
        open={left}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <div
          tabIndex={0}
          role="button"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          {sideList}
        </div>
      </SwipeableDrawer>
    </div>
  )
}

export default withStyles(styles)(SwipeableTemporaryDrawer)
