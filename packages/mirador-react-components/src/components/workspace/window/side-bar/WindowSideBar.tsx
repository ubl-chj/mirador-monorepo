import React, {ReactElement} from 'react';
import Drawer from '@material-ui/core/Drawer';
import WindowSideBarButtons from '../../../../containers/workspace/window/side-bar/WindowSideBarButtons';
import classNames from 'classnames';
import {makeStyles} from "@material-ui/styles"

interface IWindowsSideBar {
  sideBarOpen: boolean
  windowId: string
}

const useStyles = makeStyles(theme => ({
  drawer: {
    flexShrink: 0,
    height: '100%',
    left: 0,
    order: -1000,
    zIndex: theme.zIndex.appBar - 1,
  },
  grow: {
    flexGrow: 1,
  },
  paper: {
    overflowX: 'hidden',
    width: 48,
  },
  toolbar: theme.mixins.toolbar,
}));


/**
 * WindowSideBar
 */
export const WindowSideBar: React.FC<IWindowsSideBar> = (props): ReactElement => {
  const classes = useStyles()
  const {windowId, sideBarOpen} = props;

  return (
    <>
      <Drawer
        PaperProps={{ component: 'nav', style: { position: 'relative' } }}
        SlideProps={{ mountOnEnter: true, unmountOnExit: true }}
        anchor="left"
        className={classNames(classes.drawer)}
        classes={{ paper: classNames(classes.paper) }}
        open={sideBarOpen}
        variant="persistent"
      >
        <WindowSideBarButtons windowId={windowId} />
      </Drawer>
    </>
  );
}

