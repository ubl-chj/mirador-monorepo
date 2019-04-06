import {Mosaic, MosaicWindow, createBalancedTreeFromLeaves, createRemoveUpdate, getLeaves, updateTree} from 'react-mosaic-component';
import React, {ReactElement, useEffect, useState} from 'react';
import MosaicRenderPreview from '../../containers/workspace/MosaicRenderPreview';
import Window from '../../containers/window/Window';
import difference from 'lodash/difference';
import {usePrevious} from '../../hooks/usePrevious'

interface IWorkspaceMosaic {
  updateWorkspaceMosaicLayout: any
  windows: any
  workspace: any
}
/**
 * Represents a work area that contains any number of windows
 * @memberof Workspace
 * @private
 */
export const WorkspaceMosaic: React.FC<IWorkspaceMosaic> = (props): ReactElement => {
  const [newLayout, setLayout] = useState()
  const [currentWindowKeys, setCurrentWindowKeys] = useState()
  const zeroStateView = <div />;
  const windowPaths = {}
  const { updateWorkspaceMosaicLayout, windows, workspace } = props;
  const prevWindows = usePrevious(windows)
  const prevWindowKeys = prevWindows && Object.keys(prevWindows)
  const prevLayout = usePrevious(newLayout)

  /**
   * Used to determine whether or not a "new" layout should be autogenerated.
   * If a Window is added or removed, generate that new layout and use that for
   * this render. When the Mosaic changes, that will trigger a new store update.
   */
  const determineWorkspaceLayout = () => {
    const windowKeys = Object.keys(windows).sort();
    const leaveKeys = getLeaves(workspace.layout);
    // Check every window is in the layout, and all layout windows are present
    // in store
    if (!windowKeys.every(e => leaveKeys.includes(e))
      || !leaveKeys.every(e => windowKeys.includes(e))) {
      return createBalancedTreeFromLeaves(windowKeys);
    }
    return workspace.layout;
  }

  const handleRemovedWindows = () => {
    // There are no more remaining Windows, just return an empty layout
    if (currentWindowKeys.length === 0) {
      updateWorkspaceMosaicLayout({layout: {}});
    }
    // Generate a set of "removeUpdates" to update layout binary tree
    const removedWindows = difference(prevWindowKeys, currentWindowKeys);
    return removedWindows
      .map(windowId => (
        createRemoveUpdate(workspace.layout, windowPaths[windowId])
      ))
  }

  useEffect(() => {
    setLayout(determineWorkspaceLayout());
    setCurrentWindowKeys(Object.keys(windows));
    if (Object.is(newLayout, prevLayout)) {
      updateWorkspaceMosaicLayout({layout: newLayout});
      console.log('object is update')
    }
    // Handles when Windows are removed from the state
    if (prevWindowKeys && !prevWindowKeys.every(e => currentWindowKeys.includes(e))) {
      setLayout(updateTree(workspace.layout, handleRemovedWindows()));
      console.log('remove update')
    }
  }, [newLayout])

  /**
   * bookkeepPath - used to book keep Window's path's
   * @param  {String} windowId   [description]
   * @param  {Array} path [description]
   */
  const bookkeepPath = (windowId, path) => {
    windowPaths[windowId] = path;
  }

  /**
   * Render a tile (Window) in the Mosaic.
   */
  const tileRenderer = (id, path) => {
    const window = windows[id];
    if (!window) return null;
    bookkeepPath(window.id, path);
    return (
      <MosaicWindow
        additionalControls={[]}
        path={path}
        renderPreview={() => (
          <div className="mosaic-preview">
            <MosaicRenderPreview windowId={window.id} />
          </div>
        )}
        title={null}
        toolbarControls={[]}
      >
        <Window
          key={window.id}
          window={window}
        />
      </MosaicWindow>
    );
  }

  /**
   * Update the redux store when the Mosaic is changed.
   */
  const mosaicChange = (newLayout) => {
    console.log('mosaic did change')
    updateWorkspaceMosaicLayout({layout: newLayout});
  }
  return (
    <Mosaic
      className="mirador-mosaic"
      initialValue={workspace.layout || determineWorkspaceLayout()}
      onChange={mosaicChange}
      renderTile={tileRenderer}
      zeroStateView={zeroStateView}
    />
  );
}
