import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { getThumbnailNavigationPosition,
  setWindowThumbnailPosition } from '@mirador/core';
import { WindowThumbnailSettings } from '../components/WindowThumbnailSettings';
import { withPlugins } from '../extend';

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = { setWindowThumbnailPosition };

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowViewer
 * @private
 */
const mapStateToProps = (state, props) => (
  {
    thumbnailNavigationPosition: getThumbnailNavigationPosition(state, props.windowId),
  }
);

/** */
const styles = theme => ({
  selectedLabel: {
    color: theme.palette.text.primary,
  },
  optionLabel: {
    color: theme.palette.text.secondary,
  },
  MenuItem: {
    display: 'inline',
  },
});

const enhance = compose(
  withStyles(styles),
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WindowThumbnailSettings'),
);

export default enhance(WindowThumbnailSettings);
