import { compose } from 'redux';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import * as actions from '@mirador/core';
import { withStyles } from '@material-ui/core/styles';
import { WindowSideBarCanvasPanel } from '../components/WindowSideBarCanvasPanel';
import {
  getManifestCanvases,
  getWindowManifest,
} from '../state/selectors';

/**
 * mapStateToProps - to hook up connect
 */
const mapStateToProps = (state, { windowId }) => {
  const manifest = getWindowManifest(state, windowId);
  const canvases = getManifestCanvases(manifest);
  const { config } = state;
  return {
    canvases,
    config,
  };
};

const mapDispatchToProps = { setCanvas: actions.setCanvas };

/**
 *
 * @param theme
 * @returns {{clickable: {cursor: string},
 * label: {fontSize: string, paddingLeft: number}, windowSideBarH2: *}}
 */
const styles = theme => ({
  windowSideBarH2: theme.typography.h5,
  clickable: {
    cursor: 'pointer',
  },
  label: {
    fontSize: '8pt',
    paddingLeft: 8,
  },
});

const enhance = compose(
  withNamespaces(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(WindowSideBarCanvasPanel);
