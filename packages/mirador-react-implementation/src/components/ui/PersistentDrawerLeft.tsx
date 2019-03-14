import React, {EventHandler} from 'react'
import AppBar from '@material-ui/core/AppBar'
import BookOutlined from '@material-ui/icons/BookOutlined'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Home from '@material-ui/icons/Home'
import IconButton from '@material-ui/core/IconButton'
import ImageOutlined from '@material-ui/icons/ImageOutlined'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import {NavLink} from 'react-router-dom'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

const drawerWidth = 240

const styles = (theme): any => ({
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

interface IPersistentDrawerLeftComponent {
  classes: {
    appBar: string,
    appBarShift: string,
    drawer: string,
    drawerHeader: string,
    drawerPaper: string,
    hide: string,
    menuButton: string,
  },
  handleDrawerClose: EventHandler<any>,
  handleDrawerOpen: EventHandler<any>,
  open: boolean,
  theme: {
    direction: string,
  }
}

class PersistentDrawerLeftComponent extends React.Component<IPersistentDrawerLeftComponent, any> {
  public state = {
    open: false,
  }

  private listItems = [
    {
      id: 'home',
      index: 0,
      path: '/',
      text: 'Home'
    },
    {
      id: 'mirador',
      index: 1,
      path: '/view',
      text: 'Mirador'
    },
    {
      id: 'blog',
      index: 2,
      path: '/cms',
      text: 'Blog'
    },
  ]

  private buildListItemIcon = (item): JSX.Element => {
    switch (item) {
      case 'home':
        return <Home/>
      case 'mirador':
        return <ImageOutlined/>
      case 'blog':
        return <BookOutlined/>
    }
  }

  private buildListItems = (items): JSX.Element => {
    return items.map((item) =>
      <NavLink
        key={item.index}
        style={{color: '#2f2c2c', textDecoration: 'none'}}
        to={item.path}>
        <ListItem button={true}>
          <ListItemIcon>
            {this.buildListItemIcon(item.id)}
          </ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      </NavLink>
    )
  }

  public render(): any {
    const { classes, theme, handleDrawerOpen, handleDrawerClose, open } = this.props

    return (
      <>
        <AppBar
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
          position="fixed"
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              aria-label="Open drawer"
              className={classNames(classes.menuButton, open && classes.hide)}
              color="inherit"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography color="inherit" noWrap={true} variant="h6">
              Handschriften Portal
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
          open={open}
          variant="persistent"
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {this.buildListItems(this.listItems)}
          </List>
        </Drawer>
      </>
    )
  }
}

export const PersistentDrawerLeft = withStyles(styles, { withTheme: true })(PersistentDrawerLeftComponent)
