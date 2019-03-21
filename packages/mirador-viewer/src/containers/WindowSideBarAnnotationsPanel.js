import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import {
  deselectAnnotation,
  getIdAndContentOfResources,
  getSelectedAnnotationIds,
  getSelectedCanvases,
  getSelectedTargetsAnnotations,
  getAnnotationResourcesByMotivation,
  selectAnnotation
} from '@mirador/core';
import { WindowSideBarAnnotationsPanel } from '../components/WindowSideBarAnnotationsPanel';
import { withPlugins } from '../extend';

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowSideBarAnnotationsPanel
 * @private
 */
const mapStateToProps = (state, { windowId }) => ({
  annotations: getIdAndContentOfResources(
    getAnnotationResourcesByMotivation(
      getSelectedTargetsAnnotations(
        state,
        getSelectedCanvases(state, { windowId }).map(canvas => canvas.id),
      ),
      ['oa:commenting', 'sc:painting'],
    ),
  ),
  selectedAnnotationIds: getSelectedAnnotationIds(
    state, windowId, getSelectedCanvases(state, { windowId }).map(canvas => canvas.id),
  ),
});

/**
 * mapDispatchToProps - to hook up connect
 * @memberof WindowSideBarAnnotationsPanel
 * @private
 */
const mapDispatchToProps = {
  deselectAnnotation,
  selectAnnotation,
};

/** */
const styles = theme => ({
  section: {
    borderBottom: '.5px solid rgba(0,0,0,0.25)',
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit,
    paddingTop: theme.spacing.unit * 2,
  },
  selectedAnnotation: {
    backgroundColor: theme.palette.background.default,
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WindowSideBarAnnotationPanel'),
  // further HOC
);

export default enhance(WindowSideBarAnnotationsPanel);
