import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core';
import { WindowSideBar } from '../components/WindowSideBar';

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowSideBar
 * @private
 */
const mapStateToProps = (state, props) => (
  {
    sideBarOpen: state.windows[props.windowId].sideBarOpen,
    sideBarPanel: state.windows[props.windowId].sideBarPanel,
  }
);

/**
 *
 * @param theme
 * @returns {{toolbar: CSSProperties | toolbar | {minHeight}, grow: {flexGrow: number},
 * drawer: {overflowX: string, left: number, flexShrink: number, width: number, height: string}}}
 */
const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  drawer: {
    overflowX: 'hidden',
    left: 0,
    width: 55,
    flexShrink: 0,
    height: '100%',
    zIndex: theme.zIndex.appBar - 1,
    order: -1000,
  },
  grow: {
    flexGrow: 1,
  },
});

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, null),
);

export default enhance(WindowSideBar);
