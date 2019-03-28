import {
  ADD_COMPANION_WINDOW,
  ADD_WINDOW,
  FOCUS_WINDOW,
  REMOVE_WINDOW,
  UPDATE_COMPANION_WINDOW,
  receiveAnnotation,
  receiveAnnotationFailure,
  receiveInfoResponse,
  receiveInfoResponseFailure,
  receiveManifest,
  receiveManifestFailure,
  requestAnnotation,
  requestInfoResponse,
  requestManifest
} from '../actions';
import uuid from 'uuid/v4'


/**
 *
 * @param windowId
 * @param payload
 * @param defaults
 */
export const addCompanionWindow = (windowId, payload, defaults = {content: null, position: null}) => {
  return (dispatch, getState) => {
    const { companionWindows } = getState();
    const id = `cw-${uuid()}`;

    dispatch({
      companionWindows,
      id,
      payload: { ...defaults, ...payload, id },
      type: ADD_COMPANION_WINDOW,
      windowId,
    });
  };
}

/**
 * addWindow - action creator
 *
 * @param  {Object} options
 * @memberof ActionCreators
 */
export const addWindow = (options) => {
  return (dispatch, getState) => {
    const { windows } = getState();
    const numWindows = Object.keys(windows).length;

    const cwDefault = `cw-${uuid()}`;
    const cwThumbs = `cw-${uuid()}`;
    const defaultOptions = {
      canvasIndex: 0,
      collectionIndex: 0,
      companionWindowIds: [cwDefault, cwThumbs],
      height: 400,
      id: `window-${uuid()}`,
      manifestId: null,
      maximized: false,
      rangeId: null,
      rotation: null,
      selectedAnnotations: {},
      sideBarPanel: 'info',
      thumbnailNavigationId: cwThumbs,
      view: 'single',
      width: 400,
      x: 200 + (Math.floor(numWindows / 10) * 50 + (numWindows * 30) % 300),
      y: 200 + ((numWindows * 50) % 300),
    };

    dispatch({
      companionWindows: [
        {
          content: 'info',
          id: cwDefault,
          position: 'left',
        },
        {
          content: 'thumbnail_navigation',
          id: cwThumbs,
          position: options.thumbnailNavigationPosition || 'far-bottom',
        },
      ],
      type: ADD_WINDOW,
      window: { ...defaultOptions, ...options },
    });
  };
}

/**
 * fetchAnnotation - action creator
 *
 * @param  {String} annotationId
 * @memberof ActionCreators
 */
export const fetchAnnotation = (canvasId, annotationId) => {
  return ((dispatch) => {
    dispatch(requestAnnotation(canvasId, annotationId));
    return window.fetch(annotationId)
      .then((response) => response.json())
      .then((json) => dispatch(receiveAnnotation(canvasId, annotationId, json)))
      .catch((error) => dispatch(receiveAnnotationFailure(canvasId, annotationId, error)));
  });
}


/**
 * fetchInfoResponse - action creator
 *
 * @param  {String} infoId
 * @memberof ActionCreators
 */
export const fetchInfoResponse = (infoId) => {
  return (dispatch) => {
    dispatch(requestInfoResponse(infoId))
    return window.fetch(infoId)
      .then((response) => response.json())
      .then((json) => dispatch(receiveInfoResponse(infoId, json)))
      .catch((error) => dispatch(receiveInfoResponseFailure(infoId, error)))
  }
}

/**
 *
 * @param manifestId
 * @param properties
 */
export const fetchManifest = (manifestId, properties) => {
  return ((dispatch) => {
    dispatch(requestManifest(manifestId, { ...properties, isFetching: true }));

    return fetch(manifestId)
      .then((response) => response.json())
      .then((json) => dispatch(receiveManifest(manifestId, json)))
      .catch((error) => {
        if (typeof error === 'object') { // Returned by JSON parse failure
          dispatch(receiveManifestFailure(manifestId, String(error)));
        } else {
          dispatch(receiveManifestFailure(manifestId, error));
        }
      });
  });
}

/**
 *
 * @param windowId
 * @param pan
 */
export const focusWindow = (windowId, pan = false) => {
  return (dispatch, getState) => {
    const { windows, workspace } = getState();

    let position;

    if (pan) {
      const {
        x, y, width, height,
      } = windows[windowId];

      const { viewportPosition: { width: viewWidth, height: viewHeight } } = workspace;
      position = { x: (x + width / 2) - viewWidth / 2, y: (y + height / 2) - viewHeight / 2 };
    } else {
      position = {};
    }
    dispatch({
      payload: {position, windowId},
      type: FOCUS_WINDOW,
    });
  };
}

/**
 * removeWindow - action creator
 *
 * @param  {String} windowId
 * @memberof ActionCreators
 */
export const removeWindow = (windowId) => {
  return (dispatch, getState) => {
    const { windows } = getState();
    const { companionWindowIds } = windows[windowId];

    dispatch({
      payload: {companionWindowIds, windowId},
      type: REMOVE_WINDOW,
    });
  };
}

/**
 * setWindowThumbnailPosition - action creator
 *
 * @param  {String} windowId
 * @param  {String} position
 * @memberof ActionCreators
 */
export const setWindowThumbnailPosition = (windowId, position) => {
  return (dispatch, getState) => {
    const { windows } = getState();
    const { thumbnailNavigationId } = windows[windowId];

    dispatch({
      id: thumbnailNavigationId,
      payload: { position },
      type: UPDATE_COMPANION_WINDOW,
    });
  };
}