import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend';
import {
  getAnnotationResourcesByMotivation,
  getSelectedTargetAnnotations,
  getSelectedCanvas,
  toggleAnnotationDisplay
} from '@mirador/core';
import { AnnotationSettings } from '../components/AnnotationSettings';


/**
 * Mapping redux state to component props using connect
 */
const mapStateToProps = (state, { windowId }) => ({
  displayAll: state.windows[windowId].displayAllAnnotations,
  displayAllDisabled: false
});

/**
 * Mapping redux action dispatches to component props using connect
 */
const mapDispatchToProps = (dispatch, { windowId }) => ({
  toggleAnnotationDisplay: () => {
    dispatch(toggleAnnotationDisplay(windowId));
  },
});

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('AnnotationSettings'),
);

export default enhance(AnnotationSettings);
