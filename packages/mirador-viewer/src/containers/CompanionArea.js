import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { withTranslation } from 'react-i18next';
import { getCompanionWindowsOfWindow } from '../state/selectors';
import * as actions from '@mirador/core';
import { CompanionArea } from '../components/CompanionArea';
import { withPlugins } from '../extend';

/** */
const mapStateToProps = (state, { windowId, position }) => ({
  sideBarOpen: state.windows[windowId].sideBarOpen,
  companionWindows: getCompanionWindowsOfWindow(state, windowId)
    .filter(cw => cw.position === position),
  companionAreaOpen: position !== 'left' || state.windows[windowId].companionAreaOpen,
});

const mapDispatchToProps = ({
  setCompanionAreaOpen: actions.setCompanionAreaOpen,
});

/** */
const styles = theme => ({
  root: {
    position: 'relative',
    minHeight: 0,
    display: 'flex',
  },
  horizontal: {
    width: '100%',
    flexDirection: 'column',
  },
  toggle: {
    position: 'absolute',
    left: '100%',
    width: '1rem',
    zIndex: theme.zIndex.drawer,
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.primary.dark}`,
    borderRadius: 0,
    padding: 2,
    marginTop: '1rem',
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('CompanionArea'),
);

export default enhance(CompanionArea);
