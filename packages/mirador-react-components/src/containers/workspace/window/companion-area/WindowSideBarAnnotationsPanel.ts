import {
  deselectAnnotation,
  getAnnotationResourcesByMotivation,
  getSelectedAnnotationIds,
  selectAnnotation
} from '@mirador/core';
import { WindowSideBarAnnotationsPanel } from '../../../../components/workspace/window/companion-area/WindowSideBarAnnotationsPanel';
import { connect } from 'react-redux';

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

const mapStateToProps = (state, { windowId }) => ({
  annotations: getIdAndContentOfResources(
    getAnnotationResourcesByMotivation(state, { windowId }),
  ),
  selectedAnnotationIds: getSelectedAnnotationIds(state, { windowId }),
});

const mapDispatchToProps = {
  deselectAnnotation,
  selectAnnotation,
};

export default connect(mapStateToProps, mapDispatchToProps)(WindowSideBarAnnotationsPanel);
