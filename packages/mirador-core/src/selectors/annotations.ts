import { createSelector } from 'reselect-change-memoize';
import filter from 'lodash/filter';
import flatten from 'lodash/flatten';
import Annotation from '../utils/Annotation';
import { getSelectedCanvases } from './canvases';

const getAnnotationsOnSelectedCanvases = createSelector(
    'getAnnotationsOnSelectedCanvases',
  [
    getSelectedCanvases,
    state => state.annotations,
  ],
  (canvases, annotations) => {
    if (!annotations || !canvases) return [];
    return flatten(
      canvases.map(c => c.id).map(
        targetId => annotations[targetId] && Object.values(annotations[targetId]),
      ),
    );
  },
);

const getPresentAnnotationsOnSelectedCanvases = createSelector(
    'getPresentAnnotationsOnSelectedCanvases',
  [
    getAnnotationsOnSelectedCanvases,
  ],
  annotations => filter(
    Object.values(annotations).map((annotation: any)  => annotation && new Annotation(annotation.json)),
    annotation => annotation && annotation.present(),
  ),
);

/**
* Return an array of annotation resources filtered by the given motivation
* @param {Array} annotations
* @param {Array} motivations
* @return {Array}
*/
export const getAnnotationResourcesByMotivation = createSelector(
    'getAnnotationResourcesByMotivation',
  [
    getPresentAnnotationsOnSelectedCanvases,
    (state) => state.config.annotations.motivations,
  ],
  (annotations, motivations) => filter(
    flatten(annotations.map(annotation => annotation.resources)),
    (resource: any) => resource.motivations.some(
      motivation => motivations.includes(motivation),
    ),
  ),
);

/**
 * Return the selected annotations IDs of a given CanvasId
 * @param {Object} state
 * @param {String} windowId
 * @param {Array} targetIds
 * @return {Array}
 */
export const getSelectedAnnotationIds = createSelector(
    'getSelectedAnnotationIds',
  [
    (state, { windowId }) => state.windows[windowId].selectedAnnotations,
    getSelectedCanvases,
  ],
  (selectedAnnotations, canvases) => (
    flatten(
      canvases.map(c => c.id).map(targetId => selectedAnnotations && selectedAnnotations[targetId]),
    )
  ),
);

export const getAllOrSelectedAnnotationsOnCanvases = createSelector(
    'getAllOrSelectedAnnotationsOnCanvases',
  [
    getPresentAnnotationsOnSelectedCanvases,
    getSelectedAnnotationIds,
    (state, { windowId }) => state.windows[windowId].displayAllAnnotations,
  ],
  (canvasAnnotations, selectedAnnotationIds, displayAllAnnotations) => {
    if (displayAllAnnotations) return canvasAnnotations;

    return canvasAnnotations.map(annotation => ({
      id: (annotation['@id'] || annotation.id),
      resources: annotation.resources.filter(
        r => selectedAnnotationIds && selectedAnnotationIds.includes(r.id),
      ),
    }));
  },
);
