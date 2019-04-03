import {ICompanionWindow, IWindow} from 'mirador-core-model';
import {createSelector} from 'reselect'
import {getManifestTitle} from './manifests';

/**
 * Return the manifest titles for all open windows
 * @param {object} state
 * @return {object}
 */
export const getWindowTitles = (state: any) => {
  const result = {};
  Object.keys(state.windows).forEach((windowId) => {
    result[windowId] = getManifestTitle(state, { windowId });
  });
  return result;
}

/** */
export const getWindow = (state: any, { windowId}: {windowId: string, position?: string}) => {
  return state.windows && state.windows[windowId];
}

/** Return position of thumbnail navigation in a certain window.
* @param {object} state
* @param {String} windowId
* @param {String}
*/
export const getThumbnailNavigationPosition = createSelector(
  [getWindow, (state: any) => state.companionWindows],
  (window: any, companionWindows: ICompanionWindow) => window
    && companionWindows[window.thumbnailNavigationId]
    && companionWindows[window.thumbnailNavigationId].position,
);

/** Return type of view in a certain window.
* @param {object} state
* @param {object} props
* @param {string} props.manifestId
* @param {string} props.windowId
* @param {String}
*/
export const getWindowViewType = createSelector(
  getWindow,
  (window: IWindow) => window && window.view,
);

/**
* Return compantion window ids from a window
* @param {String} windowId
* @return {Array}
*/
export const getCompanionWindowIds = createSelector(
  getWindow,
  (window: IWindow) => (window && window.companionWindowIds) || [],
);

/**
 * Return companion windows of a window
 * @param {String} windowId
 * @return {Array}
 */

export const getCompanionWindowsOfWindow = createSelector(
  [getCompanionWindowIds, (state: any) => state.companionWindows],
  (companionWindowIds: [], companionWindows: ICompanionWindow) => companionWindowIds.map(id => companionWindows[id]),
);

/**
* Return the companion window string from state in a given windowId and position
* @param {object} state
* @param {String} windowId
* @param {String} position
* @return {String}
*/
export const getCompanionWindowForPosition = createSelector(
  [getCompanionWindowsOfWindow, (state) => state.config.companionWindows.defaultPosition],
  (companionWindows: any, position) => companionWindows.find(cw => cw.position === position),
);
