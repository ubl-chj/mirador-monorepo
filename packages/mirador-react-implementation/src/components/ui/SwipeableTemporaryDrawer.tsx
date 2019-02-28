import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { withStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Archive from '@material-ui/icons/Archive'
import Home from '@material-ui/icons/Home'
import ImageOutlined from '@material-ui/icons/ImageOutlined'
import MenuIcon from '@material-ui/icons/MenuSharp'
import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import {withConstructor} from '../../api'
import WorkspaceExportName from '../../containers/WorkspaceExport'
const WorkspaceExport = withConstructor(WorkspaceExportName)

const styles = {
  fullList: {
    width: 'auto',
  },
  list: {
    width: 250,
  },
}

class SwipeableTemporaryDrawer extends React.Component<any, any> {
  props: any
  history: any
  state = {
    bottom: false,
    exportWorkspace: false,
    left: false,
    right: false,
    top: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    })
  }

  toggleDialog = () => {
    this.setState((prevState) => {
      return {exportWorkspace: !prevState.exportWorkspace}
    })
  };

  handleClose = () => {
    this.setState({ exportWorkspace: false })
  };

  render() {
    const { classes } = this.props
    const {location} = this.props.history
    const {exportWorkspace} = this.state
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
        <List>
          {location && location.pathname === '/view' ? (
            <ListItem onClick={this.toggleDialog} button={true} key='export'>
              <ListItemIcon>
                <Archive/>
              </ListItemIcon>
              <ListItemText primary='Export State' />
            </ListItem>
          ) : null
          }
          <WorkspaceExport
            open={Boolean(exportWorkspace)}
            handleClose={this.handleClose}
          />
        </List>
      </div>
    )

    return (
      <div>
        <IconButton
          onClick={this.toggleDrawer('left', true)}
        >
          <MenuIcon
            style={{color: 'white', marginLeft: '3px'}}
          />
        </IconButton>
        <SwipeableDrawer
          open={this.state.left}
          onClose={this.toggleDrawer('left', false)}
          onOpen={this.toggleDrawer('left', true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </SwipeableDrawer>
      </div>
    )
  }
}
export default withStyles(styles)(withRouter(SwipeableTemporaryDrawer))
