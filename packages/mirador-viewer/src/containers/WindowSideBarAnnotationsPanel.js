import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import * as actions from '@mirador/core';
import {
  getIdAndContentOfResources,
  getSelectedAnnotationIds,
  getSelectedCanvas,
  getSelectedTargetAnnotations,
  getAnnotationResourcesByMotivation,
} from '../state/selectors';
import { WindowSideBarAnnotationsPanel } from '../components/WindowSideBarAnnotationsPanel';

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowSideBarAnnotationsPanel
 * @private
 */
const mapStateToProps = (state, { windowId }) => ({
  selectedAnnotationIds: getSelectedAnnotationIds(
    state, windowId, [getSelectedCanvas(state, windowId).id],
  ),
  annotations: getIdAndContentOfResources(
    getAnnotationResourcesByMotivation(
      getSelectedTargetAnnotations(state, getSelectedCanvas(state, windowId).id),
      ['oa:commenting', 'sc:painting'],
    ),
  ),
});

/**
 * mapDispatchToProps - to hook up connect
 * @memberof WindowSideBarAnnotationsPanel
 * @private
 */
const mapDispatchToProps = {
  selectAnnotation: actions.selectAnnotation,
  deselectAnnotation: actions.deselectAnnotation,
};

/** */
const styles = theme => ({
  selectedAnnotation: {
    backgroundColor: theme.palette.background.default,
  },
  section: {
    borderBottom: '.5px solid rgba(0,0,0,0.25)',
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit,
    paddingTop: theme.spacing.unit * 2,
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  // further HOC
);

export default enhance(WindowSideBarAnnotationsPanel);
