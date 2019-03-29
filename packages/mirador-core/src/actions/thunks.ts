import {
  FETCH_ANNOTATION,
  FETCH_INFO_RESPONSE,
  FETCH_MANIFEST,
  FOCUS_WINDOW,
  REMOVE_WINDOW,
  UPDATE_COMPANION_WINDOW,
  addWindow,
  removeWindow
} from '../actions';
import {IState} from 'mirador-core-model'
import actionCreatorFactory from 'typescript-fsa';
import {asyncFactory, bindThunkAction} from 'typescript-fsa-redux-thunk';
import uuid from 'uuid/v4'

const actionCreator = actionCreatorFactory();
const createAsync = asyncFactory<IState>(actionCreator)

/**
 * addWindow - action creator
 *
 * @param  {Object} options
 * @memberof ActionCreators
 */
export const evalAddWindows = (options) => {
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

    const companionWindows = {
      'cw-123': {
        content: 'info',
        id: cwDefault,
        position: 'left',
        thumbnailNavigationId: 'xyz'
      },
      'cw-456': {
        content: 'thumbnail_navigation',
        id: cwThumbs,
        position: options.thumbnailNavigationPosition || 'far-bottom',
        thumbnailNavigationId: 'xyz'
      },
    }

    dispatch(addWindow({companionWindows, window: { ...defaultOptions, ...options }}));
  };
}

/**
 *
 * @param annotationId
 * @param canvasId
 */
export const fetchAnnotation = createAsync<{annotationId, canvasId}, {}, {}>(FETCH_ANNOTATION,
  async (params) => {
    const res = await window.fetch(params.annotationId);
    if (!res.ok) {
      throw new Error(
        `Error ${res.status}: ${res.statusText} ${await res.text()}`);
    }
    return res.json();
  }
);

/**
 *
 * @param annotationId
 * @param canvasId
 */
export const fetchInfoResponse = createAsync<{infoId}, {}, {}>(FETCH_INFO_RESPONSE,
  async (params) => {
    const res = await fetch(params.infoId);
    if (!res.ok) {
      throw new Error(
        `Error ${res.status}: ${res.statusText} ${await res.text()}`);
    }
    return res.json();
  }
);

interface IFetchManifestParams { manifestId: string; }
type Succ = any;

/**
 *
 * @param annotationId
 * @param canvasId
 */
export const fetchManifest = createAsync<IFetchManifestParams, Succ>(FETCH_MANIFEST,
  async (params) => {
    const res = await fetch(params.manifestId);
    if (!res.ok) {
      throw new Error(
        `Error ${res.status}: ${res.statusText} ${await res.text()}`);
    }
    return res.json()
  }
);

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
export const thunkRemoveWindow = createAsync<{windowId}, {}, {}>(REMOVE_WINDOW,
  async ({windowId}, dispatch, getState) => {
    const { windows } = getState();
    const { companionWindowIds } = windows[windowId];
    await dispatch(removeWindow(companionWindowIds, windowId));
  })

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
