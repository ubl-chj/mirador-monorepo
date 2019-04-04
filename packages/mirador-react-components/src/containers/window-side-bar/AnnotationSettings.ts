import {getAnnotationResourcesByMotivation, toggleAnnotationDisplay} from '@mirador/core';
import { AnnotationSettings } from '../../components/window-side-bar/AnnotationSettings';
import { connect } from 'react-redux';

const mapStateToProps = (state, { windowId }) => ({
  displayAll: state.windows[windowId].displayAllAnnotations,
  displayAllDisabled: getAnnotationResourcesByMotivation(state, { windowId }).length < 2,
});

const mapDispatchToProps = (dispatch, { windowId }) => ({
  toggleAnnotationDisplay: () => {
    dispatch(toggleAnnotationDisplay(windowId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AnnotationSettings);
