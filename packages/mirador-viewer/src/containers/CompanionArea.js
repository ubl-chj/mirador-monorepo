import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { withTranslation } from 'react-i18next';
import { getCompanionWindowsOfWindow, setCompanionAreaOpen } from '@mirador/core';
import { CompanionArea } from '../components/CompanionArea';
import { withPlugins } from '../extend';

/** */
const mapStateToProps = (state, { windowId, position }) => ({
  companionWindows: getCompanionWindowsOfWindow(state, { windowId })
    .filter(cw => cw.position === position),
  sideBarOpen: state.windows[windowId].sideBarOpen,
});

const mapDispatchToProps = ({
  setCompanionAreaOpen,
});

/** */
const styles = theme => ({
  horizontal: {
    flexDirection: 'column',
    width: '100%',
  },
  root: {
    display: 'flex',
    minHeight: 0,
    position: 'relative',
  },
  toggle: {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.primary.dark}`,
    borderRadius: 0,
    left: '100%',
    marginTop: '1rem',
    padding: 2,
    position: 'absolute',
    width: '1rem',
    zIndex: theme.zIndex.drawer,
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('CompanionArea'),
);

export default enhance(CompanionArea);
