import { WindowSideBar } from '../components/WindowSideBar';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend';
import { withStyles } from '@material-ui/core';

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
const styles: any = theme => ({
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
});

const enhance: any = compose(
  withStyles(styles),
  connect(mapStateToProps, null),
);

export default enhance(WindowSideBar);
