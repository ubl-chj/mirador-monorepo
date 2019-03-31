import Annotation from '../utils/Annotation';
import {createSelector} from 'reselect';
import filter from 'lodash/filter';
import flatten from 'lodash/flatten';
import {getSelectedCanvases} from './canvases';

const getAnnotationsOnSelectedCanvases = createSelector(
  [
    getSelectedCanvases,
    (state: any) => state.annotations,
  ],
  (canvases: any, annotations) => {
    if (!annotations || !canvases) return [];
    return flatten(
      canvases.map(c => c.id).map(
        targetId => annotations[targetId] && Object.values(annotations[targetId]),
      ),
    );
  },
);

const getPresentAnnotationsOnSelectedCanvases = createSelector(
  getAnnotationsOnSelectedCanvases,
  annotations => filter(
    Object.values(annotations).map((annotation: any) => annotation && new Annotation(annotation.json)),
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
  [
    (state, { windowId }) => state.windows[windowId].selectedAnnotations,
    getSelectedCanvases,
  ],
  (selectedAnnotations, canvases: any) => (
    flatten(
      canvases.map(c => c.id).map(targetId => selectedAnnotations && selectedAnnotations[targetId]),
    )
  ),
);

export const getAllOrSelectedAnnotationsOnCanvases = createSelector(
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
