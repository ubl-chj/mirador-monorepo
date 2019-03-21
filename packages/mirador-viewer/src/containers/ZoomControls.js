import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import * as actions from '@mirador/core';
import { ZoomControls } from '../components/ZoomControls';
import { withPlugins } from '../extend';

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
const mapDispatchToProps = { updateViewport: actions.updateViewport };

/**
 *
 * @param theme
 * @returns {{zoom_controls: {position: string, right: number},
 * ListItem: {paddingBottom: number, paddingTop: number}}}
 */
const styles = theme => ({
  ListItem: {
    paddingBottom: 0,
    paddingTop: 0,
  },
  zoom_controls: {
    display: 'flex',
    flexDirection: 'row',
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('ZoomControls')
);

export default enhance(ZoomControls);
