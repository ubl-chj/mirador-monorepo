import { getCompanionWindowsOfWindow, setCompanionAreaOpen } from '@mirador/core';
import { CompanionArea } from '../../components/window-side-bar/CompanionArea';
import { connect } from 'react-redux';

const mapStateToProps = (state, { windowId, position }) => ({
  companionWindows: getCompanionWindowsOfWindow(state, { windowId })
    .filter(cw => cw.position === position),
  sideBarOpen: state.windows[windowId].sideBarOpen,
});

const mapDispatchToProps = ({
  setCompanionAreaOpen,
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanionArea);
