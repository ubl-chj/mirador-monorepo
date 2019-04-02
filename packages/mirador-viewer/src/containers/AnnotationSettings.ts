import {getAnnotationResourcesByMotivation, toggleAnnotationDisplay} from '@mirador/core';
import { AnnotationSettings } from '../components/AnnotationSettings';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend';
import { withTranslation } from 'react-i18next';

/**
 * Mapping redux state to component props using connect
 */
const mapStateToProps = (state, { windowId }) => ({
  displayAll: state.windows[windowId].displayAllAnnotations,
  displayAllDisabled: getAnnotationResourcesByMotivation(state, { windowId }).length < 2,
});

/**
 * Mapping redux action dispatches to component props using connect
 */
const mapDispatchToProps = (dispatch, { windowId }) => ({
  toggleAnnotationDisplay: () => {
    dispatch(toggleAnnotationDisplay(windowId));
  },
});

const enhance: any = compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('AnnotationSettings'),
);

export default enhance(AnnotationSettings);
