import {
  DESELECT_ANNOTATION,
  SELECT_ANNOTATION,
  TOGGLE_ANNOTATION_DISPLAY
} from './action-types'
import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

export const selectAnnotation = actionCreator<{annotationId, canvasId, windowId}>(SELECT_ANNOTATION)

export const deselectAnnotation = actionCreator<{annotationId, canvasId, windowId}>(DESELECT_ANNOTATION)

export const toggleAnnotationDisplay = actionCreator<{windowId}>(TOGGLE_ANNOTATION_DISPLAY)
