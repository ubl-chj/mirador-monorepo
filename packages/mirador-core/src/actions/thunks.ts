import {
  FETCH_ANNOTATION,
  FETCH_INFO_RESPONSE,
  FETCH_MANIFEST,
  FOCUS_WINDOW,
  UPDATE_COMPANION_WINDOW,
  addWindow,
  focusWindow,
  removeWindow
} from '../actions';
import actionCreatorFactory from 'typescript-fsa';
import {bindThunkAction} from 'typescript-fsa-redux-thunk';
import uuid from 'uuid/v4'

const actionCreator = actionCreatorFactory();

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
      sideBarOpen: false,
      sideBarPanel: 'info',
      thumbnailNavigationId: cwThumbs,
      view: 'single',
      width: 400,
      x: 200 + (Math.floor(numWindows / 10) * 50 + (numWindows * 30) % 300),
      y: 200 + ((numWindows * 50) % 300),
    };

    const companionWindows = [
      {
        content: 'info',
        id: cwDefault,
        position: 'left',
        thumbnailNavigationId: 'xyz'
      },
      {
        content: 'thumbnail_navigation',
        id: cwThumbs,
        position: options.thumbnailNavigationPosition || 'far-bottom',
        thumbnailNavigationId: 'xyz'
      },
    ]

    dispatch(addWindow({companionWindows, window: { ...defaultOptions, ...options }}));
  };
}

interface IFetchAnnotationParams {
  annotationId: string,
  canvasId: string
}

export const fetchAnnotation = actionCreator.async<IFetchAnnotationParams, {}, {}>(FETCH_ANNOTATION)

export const fetchAnnotationWorker = bindThunkAction(fetchAnnotation,
  async (params: IFetchAnnotationParams) => {
    const res = await window.fetch(params.annotationId);
    if (!res.ok) {
      throw new Error(
        `Error ${res.status}: ${res.statusText} ${await res.text()}`);
    }
    return res.json();
  }
);

interface IFetchInfoResponseParams { infoId: string; }

export const fetchInfoResponse = actionCreator.async<IFetchInfoResponseParams, {}, {}>(FETCH_INFO_RESPONSE)

export const fetchInfoResponseWorker = bindThunkAction(fetchInfoResponse,
  async (params: IFetchInfoResponseParams) => {
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

export const fetchManifest = actionCreator.async<IFetchManifestParams, Succ>(FETCH_MANIFEST);

export const fetchManifestWorker = bindThunkAction(fetchManifest,
  async (params: IFetchManifestParams) => {
    const res = await fetch(params.manifestId);
    if (!res.ok) {
      throw new Error(
        `Error ${res.status}: ${res.statusText} ${await res.text()}`);
    }
    return res.json()
  }
);

export const focusWindowWorker = ({windowId, pan = false}) => {
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
    dispatch(focusWindow({position, windowId}))
  };
}

export const thunkRemoveWindow = actionCreator.async<{id: string}, {}, {}>('THUNK_REMOVE_WINDOW')

export const removeWindowWorker = bindThunkAction(thunkRemoveWindow,
  async ({id}, dispatch) => {
    return dispatch(removeWindow({id}));
  })

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
