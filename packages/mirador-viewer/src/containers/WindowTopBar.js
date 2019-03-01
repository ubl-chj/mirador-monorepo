import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '@mirador/core';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { getWindowManifest, getManifestTitle } from '../state/selectors';
import { WindowTopBar } from '../components/WindowTopBar';

/** mapStateToProps */
const mapStateToProps = (state, { windowId }) => ({
  manifestTitle: getManifestTitle(getWindowManifest(state, windowId)),
});

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = (dispatch, { windowId }) => ({
  closeWindow: () => dispatch(actions.closeWindow(windowId)),
  toggleWindowSideBar: () => dispatch(actions.toggleWindowSideBar(windowId)),
});

/**
 * @param theme
 * @returns {{typographyBody: {flexGrow: number, fontSize: number|string},
 * windowTopBarStyle: {minHeight: number, paddingLeft: number, backgroundColor: string}}}
 */
const styles = theme => ({
  typographyBody: {
    flexGrow: 1,
    fontSize: '1em',
  },
  windowTopBarStyle: {
    minHeight: 32,
    paddingLeft: 4,
    backgroundColor: theme.palette.primary.light,
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(WindowTopBar);
