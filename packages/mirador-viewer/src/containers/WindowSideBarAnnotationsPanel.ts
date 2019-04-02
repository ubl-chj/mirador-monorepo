import {
  deselectAnnotation,
  getAnnotationResourcesByMotivation,
  getSelectedAnnotationIds,
  selectAnnotation
} from '@mirador/core';
import { WindowSideBarAnnotationsPanel } from '../components/WindowSideBarAnnotationsPanel';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';





/**
 * @param {Array} resources
 * @return {Array} [{ id: 'abc123', content: 'Annotation Content' }, ...]
 */
const getIdAndContentOfResources = (resources) => {
  return resources.map((resource) => ({
    content: resource.chars,
    id: resource.id,
    targetId: resource.targetId,
  }));
}

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowSideBarAnnotationsPanel
 * @private
 */
const mapStateToProps = (state, { windowId }) => ({
  annotations: getIdAndContentOfResources(
    getAnnotationResourcesByMotivation(state, { windowId }),
  ),
  selectedAnnotationIds: getSelectedAnnotationIds(state, { windowId }),
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

const enhance: any = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WindowSideBarAnnotationPanel'),
  // further HOC
);

export default enhance(WindowSideBarAnnotationsPanel);
