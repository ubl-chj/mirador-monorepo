import React, {ReactElement} from 'react';
import Drawer from '@material-ui/core/Drawer';
import WindowSideBarButtons from '../containers/WindowSideBarButtons';
import classNames from 'classnames';

interface IWindowsSideBar {
  classes: any
  sideBarOpen: boolean
  windowId: string
}
/**
 * WindowSideBar
 */
export const WindowSideBar: React.FC<IWindowsSideBar> = (props): ReactElement => {
  const {classes, windowId, sideBarOpen} = props;

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

