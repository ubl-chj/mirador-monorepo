import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '@mirador/core';
import { withTranslation } from 'react-i18next';
import { WindowSideBarPanel } from '../components/WindowSideBarPanel';

/** */
const mapDispatchToProps = {
  popOutCompanionWindow: actions.popOutCompanionWindow,
};

/** */
const mapStateToProps = (state, { windowId }) => ({
  sideBarPanel: state.windows[windowId].sideBarPanel,
});

export default compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
)(WindowSideBarPanel);
