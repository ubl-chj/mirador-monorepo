import {
  addCompanionWindow,
  getAnnotationResourcesByMotivation,
  getCompanionWindowForPosition,
} from '@mirador/core';
import { WindowSideBarButtons } from '../components/WindowSideBarButtons';
import { connect } from 'react-redux';

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof WindowSideButtons
 * @private
 */
const mapDispatchToProps = { addCompanionWindow }


/**
 * mapStateToProps - used to hook up connect to state
 * @memberof WindowSideButtons
 * @private
 */
const mapStateToProps = (state, { windowId }) => ({
  hasAnnotations: getAnnotationResourcesByMotivation(state, { windowId }).length > 0,
  sideBarPanel: (getCompanionWindowForPosition(state, { windowId }) || {}).content,
});

export default connect(mapStateToProps, mapDispatchToProps)(WindowSideBarButtons);
