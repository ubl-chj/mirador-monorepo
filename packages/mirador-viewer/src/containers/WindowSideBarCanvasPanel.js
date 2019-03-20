import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '@mirador/core';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { WindowSideBarCanvasPanel } from '../components/WindowSideBarCanvasPanel';
import {
  getManifestCanvases,
  getWindowManifest,
} from '../state/selectors';
import { withPlugins } from '../extend';

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
 * @returns {label: {paddingLeft: number}}}
 */
const styles = theme => ({
  label: {
    paddingLeft: theme.spacing.unit,
  },
  primary: {
    fontFamily: 'Google Sans,Roboto,Arial,sans-serif',
    fontSize: '.875rem',
    fontWeight: 500,
    letterSpacing: '.01785714em',
    lineHeight: '1.25rem',
  },
  listItem: {
    borderBottom: '0.5px solid rgba(0,0,0,0.12)',
    paddingRight: theme.spacing.unit,
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WindowSideBarCanvasPanel'),
);

export default enhance(WindowSideBarCanvasPanel);
