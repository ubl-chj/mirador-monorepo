import { WindowSideBar } from '../../components/window-side-bar/WindowSideBar';
import { connect } from 'react-redux';

const mapStateToProps = (state, props) => (
  {
    sideBarOpen: state.windows[props.windowId].sideBarOpen,
    sideBarPanel: state.windows[props.windowId].sideBarPanel,
  }
);

export default connect(mapStateToProps, null)(WindowSideBar);
