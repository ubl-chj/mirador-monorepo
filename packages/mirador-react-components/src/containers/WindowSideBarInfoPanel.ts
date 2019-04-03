import {
  getCanvasDescription,
  getCanvasLabel,
  getDestructuredMetadata,
  getManifestDescription,
  getManifestMetadata,
  getManifestTitle,
  getSelectedCanvas,
} from '@mirador/core';
import { WindowSideBarInfoPanel } from '../components/WindowSideBarInfoPanel';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowSideBarInfoPanel
 * @private
 */
const mapStateToProps = (state, { windowId }) => ({
  canvasDescription: getCanvasDescription(state, { canvasIndex: 'selected', windowId }),
  canvasLabel: getCanvasLabel(state, { canvasIndex: 'selected', windowId }),
  canvasMetadata: getDestructuredMetadata(getSelectedCanvas(state, { windowId })),
  manifestDescription: getManifestDescription(state, { windowId }),
  manifestLabel: getManifestTitle(state, { windowId }),
  manifestMetadata: getManifestMetadata(state, { windowId }),
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

const enhance: any = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, null),
);

export default enhance(WindowSideBarInfoPanel);
