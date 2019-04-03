import { ZoomControls } from '../components/ZoomControls';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {updateViewport} from '@mirador/core';
import { withPlugins } from '../extend';
import { withStyles } from '@material-ui/core';
import { withTranslation } from 'react-i18next';

/**
 * mapStateToProps - to hook up connect
 * @memberof Workspace
 * @private
 */
const mapStateToProps = (state, props) => (
  {
    showZoomControls: state.workspace.showZoomControls,
    viewer: state.viewers[props.windowId],
  }
);

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof Workspace
 * @private
 */
const mapDispatchToProps = { updateViewport };

/**
 *
 * @returns {{zoom_controls: {position: string, right: number},
 * ListItem: {paddingBottom: number, paddingTop: number}}}
 */
const styles: any = () => ({
  ListItem: {
    paddingBottom: 0,
    paddingTop: 0,
  },
  zoom_controls: {
    display: 'flex',
    flexDirection: 'row',
  },
});

const enhance: any = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('ZoomControls')
);

export default enhance(ZoomControls);
