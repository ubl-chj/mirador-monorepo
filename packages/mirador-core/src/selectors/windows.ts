import { createSelector } from 'reselect-change-memoize'
import { getManifestTitle } from './manifests';

/**
 * Return the manifest titles for all open windows
 * @param {object} state
 * @return {object}
 */
export function getWindowTitles(state: any): any {
  const result = {};

  Object.keys(state.windows).forEach((windowId) => {
    result[windowId] = getManifestTitle(state, { windowId });
  });
  return result;
}

/** */
function getWindow(state, { windowId }): any {
  return state.windows && state.windows[windowId];
}

/** Return position of thumbnail navigation in a certain window.
* @param {object} state
* @param {String} windowId
* @param {String}
*/
export const getThumbnailNavigationPosition = createSelector(
    'getThumbnailNavigationPosition',
  [
    getWindow,
    state => state.companionWindows,
  ],
  (window, companionWindows) => window
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
export const getWindowViewType: any = createSelector(
    'getWindowViewType',
  [getWindow],
  window => window && window.view,
);

/**
* Return compantion window ids from a window
* @param {String} windowId
* @return {Array}
*/
export const getCompanionWindowIds : any = createSelector(
    'getCompanionWindowIds',
  [getWindow],
  window => (window && window.companionWindowIds) || [],
);

/**
 * Return companion windows of a window
 * @param {String} windowId
 * @return {Array}
 */

export const getCompanionWindowsOfWindow = createSelector(
    'getCompanionWindowsOfWindow',
  [getCompanionWindowIds, (state: any)  => state.companionWindows],
  (companionWindowIds: any, companionWindows: any) => companionWindowIds.map(id => companionWindows[id]),
);

/**
* Return the companion window string from state in a given windowId and position
* @param {object} state
* @param {String} windowId
* @param {String} position
* @return {String}
*/
export const getCompanionWindowForPosition : any = createSelector(
    'getCompanionWindowForPosition',
  [getCompanionWindowsOfWindow, ({ position }) => position],
  (companionWindows: any, position) => companionWindows.find(cw => cw.position === position),
);
