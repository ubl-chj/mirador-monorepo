import { getManifestCanvases, setCanvas } from '@mirador/core';
import CanvasGroupings from '../utils/CanvasGroupings';
import { ThumbnailNavigation } from '../components/ThumbnailNavigation';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';

/**
 * mapStateToProps - used to hook up state to props
 * @memberof ThumbnailNavigation
 * @private
 */
const mapStateToProps = ({
  companionWindows, config, manifests, windows,
}, { windowId }) => ({
  canvasGroupings: new CanvasGroupings(
    getManifestCanvases({
      manifests,
      windows,
    }, { windowId }),
    windows[windowId].view,
  ),
  config,
  position: companionWindows[windows[windowId].thumbnailNavigationId].position,
  window: windows[windowId],
});

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ThumbnailNavigation
 * @private
 */
const mapDispatchToProps = {
  setCanvas,
};

/**
 * Styles for withStyles HOC
 */
const styles = theme => ({
  canvas: {
    '&$currentCanvas': {
      border: `2px solid ${theme.palette.secondary.main}`,
    },
    border: '2px solid transparent',
    color: theme.palette.common.white,
    cursor: 'pointer',
    margin: '2px',
    padding: '2px',
  },
  currentCanvas: {
  },
  root: {
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  title: {
    color: '#ffffff',
  },
});

const enhance: any = compose(
  withStyles(styles),
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(ThumbnailNavigation);
