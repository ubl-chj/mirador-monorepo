import AppBar from '@material-ui/core/AppBar'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import BookOutlined from '@material-ui/icons/BookOutlined'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Home from '@material-ui/icons/Home'
import ImageOutlined from '@material-ui/icons/ImageOutlined'
import MenuIcon from '@material-ui/icons/Menu'
import classNames from 'classnames'
import React from 'react'
import {Link} from 'react-router-dom'

const drawerWidth = 240

const styles = (theme) => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.easeOut,
    }),
    width: `calc(100% - ${drawerWidth}px)`,
  },
  drawer: {
    flexShrink: 0,
    width: drawerWidth,
  },
  drawerHeader: {
    alignItems: 'center',
    display: 'flex',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  drawerPaper: {
    width: drawerWidth,
    zIndex: 3000,
  },
  hide: {
    display: 'none',
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
})

class PersistentDrawerLeftComponent extends React.Component<any, any> {
  propTypes: any
  state = {
    open: false,
  }

  render() {
    const { classes, theme, handleDrawerOpen, handleDrawerClose, open } = this.props

    return (
      <>
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap={true}>
              Handschriften Portal
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
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
            <Link to='/cms'>
              <ListItem button={true} key='cms'>
                <ListItemIcon>
                  <BookOutlined/>
                </ListItemIcon>
                <ListItemText primary='Blog' />
              </ListItem>
            </Link>
          </List>
        </Drawer>
      </>
    )
  }
}

export const PersistentDrawerLeft = withStyles(styles, { withTheme: true })(PersistentDrawerLeftComponent)
