import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import {
  getDestructuredMetadata,
  getCanvasLabel,
  getManifestDescription,
  getManifestTitle,
  getSelectedCanvas,
  getWindowManifest,
  getCanvasDescription,
} from '../state/selectors';
import { WindowSideBarInfoPanel } from '../components/WindowSideBarInfoPanel';
import { withPlugins } from '../extend';

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowSideBarInfoPanel
 * @private
 */
const mapStateToProps = (state, { windowId }) => ({
  canvasLabel: getCanvasLabel(
    getSelectedCanvas(state, windowId),
    state.windows[windowId].canvasIndex,
  ),
  canvasDescription: getCanvasDescription(getSelectedCanvas(state, windowId)),
  canvasMetadata: getDestructuredMetadata(getSelectedCanvas(state, windowId)),
  manifestId: state.windows[windowId].manifestId,
  manifestLabel: getManifestTitle(getWindowManifest(state, windowId)),
  manifestDescription: getManifestDescription(getWindowManifest(state, windowId)),
  manifestMetadata: getDestructuredMetadata(getWindowManifest(state, windowId).manifestation),
});

/**
 *
 * @param theme
 * @returns {label: {paddingLeft: number}}}
 */
const styles = theme => ({
  section: {
    borderBottom: '.5px solid rgba(0,0,0,0.25)',
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit,
    paddingTop: theme.spacing.unit * 2,
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, null),
  withPlugins('WindowSideBarInfoPanel'),
);

export default enhance(WindowSideBarInfoPanel);
