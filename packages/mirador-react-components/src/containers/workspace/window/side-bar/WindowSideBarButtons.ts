import {
  addCompanionWindow,
  getAnnotationResourcesByMotivation,
  getCompanionWindowForPosition,
} from '@mirador/core';
import { WindowSideBarButtons } from '../../../../components/workspace/window/side-bar/WindowSideBarButtons';
import { connect } from 'react-redux';

const mapDispatchToProps = { addCompanionWindow }

const mapStateToProps = (state, { windowId }) => ({
  hasAnnotations: getAnnotationResourcesByMotivation(state, { windowId }).length > 0,
  sideBarPanel: (getCompanionWindowForPosition(state, { windowId }) || {}).content,
});

export default connect(mapStateToProps, mapDispatchToProps)(WindowSideBarButtons);
