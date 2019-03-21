import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { getWindowViewType, setWindowViewType } from '@mirador/core';
import { WindowViewSettings } from '../components/WindowViewSettings';
import { withPlugins } from '../extend';

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = { setWindowViewType };

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowViewer
 * @private
 */
const mapStateToProps = (state, { windowId }) => (
  {
    windowViewType: getWindowViewType(state, { windowId }),
  }
);

/** */
const styles = theme => ({
  MenuItem: {
    display: 'inline',
  },
  optionLabel: {
    color: theme.palette.text.secondary,
  },
  selectedLabel: {
    color: theme.palette.text.primary,
  },
});

const enhance = compose(
  withStyles(styles),
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WindowViewSettings'),
);

export default enhance(WindowViewSettings);
